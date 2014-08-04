var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

if (typeof westfield === "undefined" || westfield === null) {
  this.westfield = {};
}

this.westfield.components = {};

westfield.spacing = {
  base: 21
};

this.body = $('body');

this.doc = $(document);

this.pageContainer = $('.js-page-container');

this.isOldIE = $('html').hasClass('ie-9');

this.ToggleVisibility = (function() {
  ToggleVisibility.prototype.isActiveClass = 'is-active';

  ToggleVisibility.prototype.triggerSelector = '[toggle-visibility]';

  ToggleVisibility.prototype.targetSelector = 'js-toggle-visibility-target';

  ToggleVisibility.prototype.triggerEvent = 'click';

  ToggleVisibility.prototype.events = {
    show: 'toggle-visibility.show',
    showTarget: 'toggle-visibility.show-target',
    hide: 'toggle-visibility.hide',
    hideTarget: 'toggle-visibility.hide-target'
  };

  function ToggleVisibility() {
    this.show = __bind(this.show, this);
    this.closeAll = __bind(this.closeAll, this);
    this.hide = __bind(this.hide, this);
    this.toggleTarget = __bind(this.toggleTarget, this);
    this.setupEventListeners = __bind(this.setupEventListeners, this);
    this.initialiseElements = __bind(this.initialiseElements, this);
    this.getTriggers = __bind(this.getTriggers, this);
    this.getTriggers();
    this.initialiseElements();
    this.setupEventListeners();
  }

  ToggleVisibility.prototype.getTarget = function(trigger, returnId) {
    var targetId;
    if (returnId == null) {
      returnId = false;
    }
    targetId = trigger.attr('toggle-visibility');
    if (returnId) {
      return [$("#" + targetId), targetId];
    } else {
      return $("#" + targetId);
    }
  };

  ToggleVisibility.prototype.getTriggers = function() {
    return this.triggers = $(this.triggerSelector);
  };

  ToggleVisibility.prototype.initialiseElements = function() {
    return this.triggers.each((function(_this) {
      return function(i, element) {
        var target, targetId, trigger, _ref;
        trigger = $(element);
        _ref = _this.getTarget(trigger, true), target = _ref[0], targetId = _ref[1];
        trigger.attr({
          'aria-haspopup': true,
          'aria-controls': targetId,
          'aria-expanded': false
        });
        return target.addClass(_this.targetSelector);
      };
    })(this));
  };

  ToggleVisibility.prototype.setupEventListeners = function() {
    var self;
    self = this;
    doc.on(this.triggerEvent, this.triggerSelector, function() {
      return self.toggleTarget($(this));
    });
    doc.on('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 27) {
          event.stopPropagation();
          if ((_this.trigger != null) && (_this.target != null)) {
            _this.hide();
          }
          return $("" + _this.triggerSelector + ".is-active").click();
        }
      };
    })(this));
    return doc.on('click', (function(_this) {
      return function(event) {
        var isAnotherDropdownOpen, isOpenDropdownDifferentToClickTarget, isToggleVisibility, togvisParent;
        isToggleVisibility = "" + _this.triggerSelector + ", ." + _this.targetSelector;
        isAnotherDropdownOpen = (_this.trigger != null) && (_this.target != null);
        togvisParent = $(event.target).closest(isToggleVisibility);
        isOpenDropdownDifferentToClickTarget = isAnotherDropdownOpen && !(togvisParent.is(_this.trigger)) && !(togvisParent.is(_this.target));
        if (isAnotherDropdownOpen && isOpenDropdownDifferentToClickTarget) {
          return _this.hide();
        }
      };
    })(this));
  };

  ToggleVisibility.prototype.toggleTarget = function(trigger) {
    var isActive, target;
    target = this.getTarget(trigger);
    isActive = target.hasClass(this.isActiveClass);
    if (isActive) {
      this.hide(trigger, target);
    } else {
      this.show(trigger, target);
    }
    if (trigger.attr('toggle-visibility-drop-down') !== 'false') {
      this.trigger = trigger;
      return this.target = target;
    }
  };

  ToggleVisibility.prototype.hide = function(trigger, target) {
    if (trigger == null) {
      trigger = this.trigger;
    }
    if (target == null) {
      target = this.target;
    }
    trigger.removeClass(this.isActiveClass).attr('aria-expanded', false);
    target.removeClass(this.isActiveClass);
    target.find('input[type=text], input[type=search]').eq(0).blur();
    trigger.trigger(this.events.hide);
    return target.trigger(this.events.hideTarget);
  };

  ToggleVisibility.prototype.closeAll = function() {
    if ((this.trigger != null) || (this.target != null)) {
      return this.hide();
    }
  };

  ToggleVisibility.prototype.show = function(trigger, target) {
    var isAnotherDropdownOpen, isInsideTogVis, isOpenDropdownDifferentToCurrentTarget;
    isAnotherDropdownOpen = (this.trigger != null) && (this.target != null);
    if (isAnotherDropdownOpen) {
      isOpenDropdownDifferentToCurrentTarget = !(this.trigger.is(trigger)) && !(this.target.is(target));
      isInsideTogVis = target.parents('.js-toggle-visibility-target.is-active').length && this.target.is(target.parents('.js-toggle-visibility-target.is-active'));
      if (isOpenDropdownDifferentToCurrentTarget && !isInsideTogVis) {
        this.hide(this.trigger, this.target);
        this.trigger = null;
        this.target = null;
      }
    }
    trigger.addClass(this.isActiveClass).attr('aria-expanded', true);
    target.addClass(this.isActiveClass);
    trigger.trigger(this.events.show);
    return target.trigger(this.events.showTarget);
  };

  return ToggleVisibility;

})();

$((function(_this) {
  return function() {
    return _this.TogVis = new ToggleVisibility();
  };
})(this));
