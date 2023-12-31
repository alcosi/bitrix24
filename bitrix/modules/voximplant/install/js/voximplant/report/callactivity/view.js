;(function()
{
	"use strict";
	BX.namespace("BX.Voximplant.Report.Dashboard.Content");

	BX.Voximplant.Report.Dashboard.Content.CallActivity = function ()
	{
		BX.Report.VisualConstructor.Widget.Content.Activity.apply(this, arguments);
	};

	BX.Voximplant.Report.Dashboard.Content.CallActivity.prototype = {

		__proto__: BX.Report.VisualConstructor.Widget.Content.Activity.prototype,
		constructor: BX.Voximplant.Report.Dashboard.Content.CallActivity,

		render: function()
		{
			jsDD.unregisterObject(this.getWidget().getWidgetContainer());
			this.getWidget().makeDraggable(this.getWidget().getHeadContainer());

			if (!this.graphContainer)
			{
				this.graphContainer = BX.create('div', {
					style: {
						height: this.getHeight() + 'px'
					}
				});
				var graph = new BX.Voximplant.Report.Widget.Activity({
					renderTo: this.graphContainer,
					labelY: this.data.config.labelY,
					labelX: this.data.config.labelX,
					workingHours: this.data.config.workingHours,
					tooltips: this.data.config.tooltips,
					items: this.data.items
				});
				graph.render();
			}

			return this.graphContainer;
		}
	}
})();