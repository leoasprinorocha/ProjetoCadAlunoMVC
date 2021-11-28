/***********************************************************************************
* Add Array.indexOf                                                                *
***********************************************************************************/
(function ()
{
	if (typeof Array.prototype.indexOf !== 'function')
	{
		Array.prototype.indexOf = function(searchElement, fromIndex)
		{
			for (var i = (fromIndex || 0), j = this.length; i < j; i += 1)
			{
				if ((searchElement === undefined) || (searchElement === null))
				{
					if (this[i] === searchElement)
					{
						return i;
					}
				}
				else if (this[i] === searchElement)
				{
					return i;
				}
			}
			return -1;
		};
	}
})();
/**********************************************************************************/

(function ($, undefined) {
	var toasting =
	{
		gettoaster: function () {
			var toaster = $('#' + settings.toaster.id);

			if (toaster.length < 1) {
				toaster = $(settings.toaster.template).attr('id', settings.toaster.id).css(settings.toaster.css).addClass(settings.toaster['class']);

				if ((settings.stylesheet) && (!$("link[href=" + settings.stylesheet + "]").length)) {
					$('head').appendTo('<link rel="stylesheet" href="' + settings.stylesheet + '">');
				}

				$(settings.toaster.container).append(toaster);
			}

			return toaster;
		},

		notify: function (title, message, priority, habilitarsetTimeout) {
			var $toaster = this.gettoaster();
			var $toast = $(settings.toast.template.replace('%priority%', priority)).hide().css(settings.toast.css).addClass(settings.toast['class']);

			$('.title', $toast).css(settings.toast.csst).html(title);
			$('.message', $toast).css(settings.toast.cssm).html(message);

			if (priority === 'info') {
				$('.teste', $toast).prepend('<div class="col-sm-1 mt-2"><i class="fa fa-info fa-2x"></i></div>');
			}
			if (priority === 'warning') {
				$('.teste', $toast).prepend('<div class="col-sm-1 mt-2"><i class="fa fa-exclamation-triangle fa-2x"></i></div>');
			}
			if (priority === 'success') {
				$('.teste', $toast).prepend('<div class="col-sm-1 mt-2"><i class="fa fa-check fa-2x"></i></div>');
			}
			if (priority === 'danger') {
				$('.teste', $toast).prepend('<div class="col-sm-1 mt-2"><i class="fa fa-exclamation-triangle fa-2x"></i></div>');
			}



			if ((settings.debug) && (window.console)) {
				console.log(toast);
			}

			$toaster.append(settings.toast.display($toast));

			if (settings.donotdismiss.indexOf(priority) === -1) {
				var timeout = (typeof settings.timeout === 'number') ? settings.timeout : ((typeof settings.timeout === 'object') && (priority in settings.timeout)) ? settings.timeout[priority] : 5000;
				if (!habilitarsetTimeout) {
					setTimeout(function () {
						settings.toast.remove($toast, function () {
							$toast.remove();
						});
					}, timeout);
				}
			}
		}
	};

	var defaults =
	{
		'toaster':
		{
			'id': 'toaster',
			'container': 'body',
			'template': '<div></div>',
			'class': 'toaster',
			'css':
			{
				'position': 'fixed',
				'top': '50px',
				'right': '30px',
				'width': '300px',
				'zIndex': 70000
			}
		},

		'toast':
		{
			'template':
				'<div class="alert alert-%priority% alert-dismissible" role="alert">' +
				'<button type="button" class="close" data-dismiss="alert">' +
				'<span aria-hidden="true">&times;</span>' +
				'<span class="sr-only">Close</span>' +
				'</button>' +
				'<div class="row teste"><div class="col ml-2"><span class="title" style="font-weight: bold;">Aviso</span>: <span class="message"></span></div></div>' +

				'</div>',

			'defaults':
			{
				'title': 'Notice',
				'priority': 'success',
				'habilitarsetTimeout': true
			},

			'css': {},
			'cssm': {},
			'csst': { 'fontWeight': 'bold' },

			'fade': 'slow',

			'display': function ($toast) {
				return $toast.fadeIn(settings.toast.fade);
			},

			'remove': function ($toast, callback) {
				return $toast.animate(
					{
						opacity: '0',
						padding: '0px',
						margin: '0px',
						height: '0px'
					},
					{
						duration: settings.toast.fade,
						complete: callback
					}
				);
			}
		},

		'debug': false,
		'timeout': 5000,
		'stylesheet': null,
		'donotdismiss': []
	};

	var settings = {};
	$.extend(settings, defaults);

	function toaster(options) {
		if (typeof options === 'object') {
			if ('settings' in options) {
				settings = $.extend(true, settings, options.settings);
			}
		}
		else {
			var values = Array.prototype.slice.call(arguments, 0);
			var labels = ['message', 'title', 'priority'];
			options = {};

			for (var i = 0, l = values.length; i < l; i += 1) {
				options[labels[i]] = values[i];
			}
		}

		var title = (('title' in options) && (typeof options.title === 'string')) ? options.title : settings.toast.defaults.title;
		var message = ('message' in options) ? options.message : null;
		var priority = (('priority' in options) && (typeof options.priority === 'string')) ? options.priority : settings.toast.defaults.priority;
		var habilitarsetTimeout = (('setTimeout' in options) && (typeof options.habilitarsetTimeout === 'boolean')) ? options.habilitarsetTimeout : true;

		if (message !== null) {
			toasting.notify(title, message, priority, habilitarsetTimeout);
		}
	};

	$.toaster.reset = function () {
		settings = {};
		$.extend(settings, defaults);
	};
});
