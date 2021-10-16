import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { ScaleLinear, ScaleTime } from 'd3';
import { CurrencyPrice } from '@bp/currency/data-access';

@Component({
	selector: 'bp-line-chart',
	template: `<div class="line-chart"></div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	@Input() data: CurrencyPrice[] | null = [];

	private svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined;
	private svgInner: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;
	private lineGroup: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined;
	private xAxis: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;
	private yAxis: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;

	private yScale!: ScaleLinear<number, number, never>;
	private xScale!: Date[] & ScaleTime<number, number, never>;

	private width = 700;
	private height = 700;
	private margin = 50;

	private destroyed: Subject<void> = new Subject();

	constructor(private chartElem: ElementRef) {
	}

	ngOnInit(): void {
		fromEvent(window, 'resize').pipe(
			debounceTime(100),
			takeUntil(this.destroyed),
		).subscribe(() => this.drawChart());
	}

	ngAfterViewInit(): void {
		this.initializeSvg();
		this.drawChart();
	}

	ngOnChanges(): void {
		this.drawChart();
	}

	ngOnDestroy(): void {
		this.destroyed.next();
		this.destroyed.complete();
	}

	private initializeSvg(): void {
		this.svg = d3
			.select(this.chartElem.nativeElement)
			.select('.line-chart')
			.append('svg')
			.attr('height', this.height);

		this.svgInner = this.svg
			.append('g')
			.style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

		this.lineGroup = this.svgInner
			.append('g')
			.append('path')
			.attr('id', 'line')
			.style('fill', 'none')
			.style('stroke', 'red')
			.style('stroke-width', '2px');

		this.yAxis = this.svgInner
			.append('g')
			.attr('id', 'y-axis')
			.style('transform', 'translate(' + this.margin + 'px,  0)');

		this.xAxis = this.svgInner
			.append('g')
			.attr('id', 'x-axis')
			.style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

	}

	private drawChart(): void {
		if (!this.svg || !this.data) return;

		this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
		this.svg.attr('width', this.width);

		this.drawXAxis();
		this.drawYAxis();
		this.drawLine();
	}

	private drawXAxis(): void {
		// @ts-ignore
		this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.timestamp)));
		this.xScale.range([this.margin, this.width - 2 * this.margin]);

		const xAxis = d3
			.axisBottom(this.xScale)
			.ticks(10)
			.tickFormat(d3.timeFormat('%H:%M:%S%'));

		this.xAxis?.call(xAxis);
	}

	private drawYAxis(): void {
		// @ts-ignore
		this.yScale = d3.scaleLinear()
			// @ts-ignore
			.domain([d3.max(this.data, d => d.price) + 1, d3.min(this.data, d => d.price) - 1])
			.range([0, this.height - 2 * this.margin])
			// ;
		const yAxis = d3.axisLeft(this.yScale).tickFormat((d) => d3.format(",")(d) + " $" );
		// this.yAxis?.call(d3.axisLeft(this.yScale));
		this.yAxis?.call(yAxis);
	}

	private drawLine(): void {
		const line = d3
			.line()
			.x(d => d[0])
			.y(d => d[1])
			.curve(d3.curveMonotoneX);

		const points: [number, number][] = (this.data || []).map(d => [
			this.xScale(new Date(d.timestamp)),
			this.yScale(d.price),
		]);

		this.lineGroup?.attr('d', line(points));
	}
}
