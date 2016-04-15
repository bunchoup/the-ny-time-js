// Bundled with Fusion v0.1



/*
 * File: vendor/bootstrap/affix.js
 */
/* ========================================================================
 * Bootstrap: affix.js v3.0.2
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);



/*
 * File: vendor/bootstrap/alert.js
 */
/* ========================================================================
 * Bootstrap: alert.js v3.0.2
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);



/*
 * File: vendor/bootstrap/button.js
 */
/* ========================================================================
 * Bootstrap: button.js v3.0.2
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);



/*
 * File: vendor/bootstrap/carousel.js
 */
/* ========================================================================
 * Bootstrap: carousel.js v3.0.2
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);



/*
 * File: vendor/bootstrap/collapse.js
 */
/* ========================================================================
 * Bootstrap: collapse.js v3.0.2
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);



/*
 * File: vendor/bootstrap/dropdown.js
 */
/* ========================================================================
 * Bootstrap: dropdown.js v3.0.2
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(jQuery);



/*
 * File: vendor/bootstrap/modal.js
 */
/* ========================================================================
 * Bootstrap: modal.js v3.0.2
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);



/*
 * File: vendor/bootstrap/popover.js
 */
/* ========================================================================
 * Bootstrap: popover.js v3.0.2
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);



/*
 * File: vendor/bootstrap/scrollspy.js
 */
/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.2
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);



/*
 * File: vendor/bootstrap/tab.js
 */
/* ========================================================================
 * Bootstrap: tab.js v3.0.2
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);



/*
 * File: vendor/bootstrap/tooltip.js
 */
/* ========================================================================
 * Bootstrap: tooltip.js v3.0.2
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);



/*
 * File: vendor/bootstrap/transition.js
 */
/* ========================================================================
 * Bootstrap: transition.js v3.0.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);



/*
 * File: mw.Nytime-js.js
 */
var mw = mw || {};

mw.Nytime-js = {};

var iterator = mw.Nytime-js;

jQuery(document).ready(function moovwebmoduleLoad() {
  for(var moduleKey in iterator) {
    var module = iterator[moduleKey];
    if(module.name && (jQuery("body").hasClass(module.name) || module.name === "mw-global") && typeof module.init !== 'undefined') {
      console.log(module.name);
      module.init();
    }
  }
});





/*
 * File: http://downloads.moovweb.com/uranium/1.0.176/uranium-pretty.js
 */
// jQuery.Uranium.js
// Build out Uranium interactions in jQuery

(function ( $ ) {

// for compatibility with older versions of jQuery
var jqVersion = $.fn.jquery.split(".");
if (jqVersion[0] == 1 && jqVersion[1] < 4) {
  // older jquery returns document for null selectors
  var _$ = $;
  $ = $.extend(function (selector, context) {
    return new $.fn.init(selector || [], context);
  }, $);
  $.prototype = _$.prototype;
}

if (!$.fn.on)
  $.fn.extend({
    on: function(types, selector, data, fn) {
      if (data == null && fn == null) {
        // ( types, fn )
        fn = selector;
        selector = null;
      }
      else if (fn == null && typeof selector != "string") {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = null;
      }
      return selector ? this.delegate(selector, types, data, fn) : this.bind(types, data, fn);
    },
    off: function(types, selector, fn) {
      if (fn == null) {
        // ( types, fn )
        fn = selector;
        selector = null;
      }
      return selector ? this.undelegate(selector, types, fn) : this.unbind(types, fn);
    }
  });
if (!$.fn.addBack)
  $.fn.addBack = $.fn.andSelf;
if (!$.error)
  $.error = function (msg) {
    throw new Error(msg);
  };
if ($.fn.closest.length == 1) {
  $.fn._closest = $.fn.closest;
  $.fn.closest = function(selector, context) {
    var closest = this._closest(selector);
    if (context) {
      closest = closest.filter(function(_, elem) {
        return context.contains(elem);
      });
    }
    return closest;
  }
}

// Keep a unique value for ID initialization
var uniqueUraniumId = function() {
  var count = 0;
  return function() { return "ur" + (++count); };
}();

// Find elements for the interactions
// optional customFn(set, component) for custom creation of object
function findElements( fragment, type, customFn ) {
  var sets = {};
  var setCss = "[data-ur-set='" + type + "']";
  var compAttr = "data-ur-" + type + "-component";

  var all = "[" +compAttr +"]," + setCss + ":empty";
  $(fragment).find(all).addBack(all).each(function() {
    if ($(this).data("urCompInit"))
      return;
    
    var set = [];
    if (this != document) // for old jQuery compatibility
      set = $(this).attr("data-ur-id") ? $(this) : $(this).closest(setCss);
    if (set[0] && !set.data("urInit")) {
      $(this).data("urCompInit", type);
      var setId = set.attr("data-ur-id");
      if (!setId) {
        setId = uniqueUraniumId();
        set.attr("data-ur-id", setId);
      }
      sets[setId] = sets[setId] || {};
      sets[setId]._id = setId;

      if (set.is(setCss))
        sets[setId].set = set[0];

      if (customFn)
        customFn(sets[setId], this);
      else {
        var compName = $(this).attr(compAttr);
        if (compName) {
          sets[setId][compName] = sets[setId][compName] || [];
          sets[setId][compName].push(this);
        }
      }
    }
  });
  return sets;
}

// used for JavaScript initialization e.g. Uranium.lib.widgetname({...})
function assignElements( set, type, customFn ) {
  var setId = uniqueUraniumId();
  
  $.each(set, function(key, comps) {
    if (typeof comps == "string")
      set[key] = comps = $(comps);
    for (var i = comps.length - 1; i >= 0; i--) {
      var comp = $(comps[i]);
      if (comp[0] instanceof Node) {
        if (comp.data("urCompInit"))
          $(comps).splice(i, 1);
        else
          $(this).data("urCompInit", type);
      }
    }
    if (!customFn && key != "set")
      $(comps).attr("data-ur-" + type + "-component", key);
  });
  if (set["set"] && set["set"].length !== 0)
    $(set["set"]).attr("data-ur-set", type).attr("data-ur-id", setId);
  else
    $.each(set, function() {
      $(this).attr("data-ur-id", setId);
    });
  
  if (customFn)
    customFn(set);
  
  var sets = {};
  sets[setId] = $.extend({_id: setId}, set);
  return sets;
}

// test for transform3d, technically supported on old Android but very buggy
var oldAndroid = /Android [12]/.test(navigator.userAgent);
var transform3d = !oldAndroid;
if (transform3d) {
  var css3d = "translate3d(0, 0, 0)";
  var elem3d = $("<a>").css({ webkitTransform: css3d, MozTransform: css3d, msTransform: css3d, transform: css3d });
  transform3d =
    (elem3d.css("WebkitTransform") +
     elem3d.css("MozTransform") +
     elem3d.css("msTransform") +
     elem3d.css("transform") +
     "").indexOf("(") != -1;
}

// test for touch screen
var touchscreen = "ontouchstart" in window;
var downEvent = (touchscreen ? "touchstart" : "mousedown") + ".ur";
var moveEvent = (touchscreen ? "touchmove" : "mousemove") + ".ur";
var upEvent = (touchscreen ? "touchend" : "mouseup") + ".ur";

function getEventCoords(event) {
  var touches = event.originalEvent.touches || [];
  var changedTouches = event.originalEvent.changedTouches || [];
  event = touches[0] || changedTouches[0] || event;
  var coords = {x: event.clientX, y: event.clientY};
  if (touches[1]) {
     coords.x2 = touches[1].clientX;
     coords.y2 = touches[1].clientY;
  }
  return coords;
}

// stop event helper
function stifle(e) {
  e.preventDefault();
  e.stopPropagation();
}

function bound(num, range) {
  return Math.max(range[0], Math.min(num, range[1]));
}

function isenabled(val) {
  return typeof val == "string" ? val != "disabled" && val != "false" : val;
}

function isPlainObj(obj) {
  return typeof obj == "object" && Object.getPrototypeOf(obj) == Object.prototype;
}

var interactions = {};

// Toggler
interactions.toggler = function( fragment ) {
  if (isPlainObj(fragment))
    var groups = assignElements(fragment, "toggler");
  else
    var groups = findElements(fragment, "toggler");

  $.each(groups, function(id, group) {
    if (!group["button"])
      $.error("no button found for toggler with id: " + id);
    if (!group["content"])
      $.error("no content found for toggler with id: " + id);

    var togglerState = $(group["button"]).attr("data-ur-state") || "disabled";
    $(group["button"]).add(group["content"]).attr("data-ur-state", togglerState);

    $(group["button"]).on("click.ur.toggler", function(event) {
      var enabled = $(group["button"]).attr("data-ur-state") == "enabled";
      var newState = enabled ? "disabled" : "enabled";
      $(group["button"]).add(group["content"]).attr("data-ur-state", newState);
      if (!enabled)
        $(group["drawer"]).attr("data-ur-state", newState);
    });

    $(group["drawer"]).on("webkitTransitionEnd.ur.toggler transitionend.ur.toggler", function() {
      $(this).attr("data-ur-state", $(group["button"]).attr("data-ur-state"));
    });

    $(group["set"]).data("urInit", true);
  });
};

// Tabs
interactions.tabs = function( fragment, options ) {
  options = options || {};
  if (isPlainObj(fragment))
    var groups = assignElements(fragment, "tabs", function(set) {
      $.each(set.tabs, function(key) {
        $.each(this, function(compName) {
          $(this).attr({"data-ur-id": key, "data-ur-tabs-component": compName});
        });
      });
    });
  else
    var groups = findElements(fragment, "tabs", function(set, comp) {
      var tabId = $(comp).attr("data-ur-tab-id");
      set.tabs = set.tabs || {};
      set.tabs[tabId] = set.tabs[tabId] || {};
      var compName = $(comp).attr("data-ur-tabs-component");
      set.tabs[tabId][compName] = set.tabs[tabId][compName] || [];
      set.tabs[tabId][compName].push(comp);
    });

  $.each(groups, function(id, group) {
    group["closeable"] = isenabled($(group["set"]).attr("data-ur-closeable") || options.closeable);

    // Set the state of the tabs
    $.each(group["tabs"], function() {
      var tabState = $(this["button"]).attr("data-ur-state") || "disabled";
      $(this["button"]).add(this["content"]).attr("data-ur-state", tabState);
    });

    // Set up the button call backs
    $.each(group["tabs"], function(_, tab) {
      $(tab["button"]).on("click.ur.tabs", function() {
        // Is the tab open already?
        var open = $(this).attr("data-ur-state") == "enabled";
        $.each(group["tabs"], function() {
          $(this["button"]).add(this["content"]).attr("data-ur-state", "disabled");
        });
        // If closeable (active tab can be toggled) then make sure it happens.
        if (!open || !group["closeable"]) {
          $(tab["button"]).add(tab["content"]).attr("data-ur-state", "enabled");
        }
      });
    });

    $(group["set"]).data("urInit", true);
  });
};

// Input Clear
interactions.inputclear = function( fragment ) {
  if (isPlainObj(fragment))
    var groups = assignElements(fragment, "input-clear");
  else
    var groups = findElements(fragment, "input-clear");
  $.each(groups, function(id, group) {
    // Create the X div and hide it (even though this should be in CSS)
    var ex = $("<div class='data-ur-input-clear-ex'></div>").hide();
    // Inject it
    $(group['set']).append(ex);

    // Touch Events
    ex
      .on(touchscreen ? "touchstart.ur.inputclear" : "click.ur.inputclear", function() {
        // remove text in the box
        input[0].value='';
        input[0].focus();
      })
      .on("touchend.ur.inputclear", function() {
        // make sure the keyboard doesn't disappear
        input[0].blur();
      });

    var input = $(group["set"]).find("input");
    input
      .on("focus.ur.inputclear", function() {
        if (input[0].value != '') {
          ex.show();
        }
      })
      .on("keydown.ur.inputclear", function() {
        ex.show();
      })
      .on("blur.ur.inputclear", function() {
        // Delay the hide so that the button can be clicked
        setTimeout(function() { ex.hide();}, 150);
      });
    
    $(group["set"]).data("urInit", true);
  });
};

// Geocode
interactions.geocode = function ( fragment, options ) {
  options = options || {};
  if (isPlainObj(fragment))
    var groups = assignElements(fragment, "reverse-geocode", function(set) {
      set["elements"] = set["elements"] || {};
      $.each(set, function(key, value) {
        if (key != "set")
          set["elements"][key] = $(value);
      });
    });
  else
    var groups = findElements(fragment, "reverse-geocode", function(set, comp) {
      set["elements"] = set["elements"] || {};
      set["elements"][$(comp).attr("data-ur-reverse-geocode-component")] = comp;
    });

  $.each(groups, function(id, group) {
    var set = this['set'];

    var callback = $(set).attr("data-ur-callback") || options.callback;
    var errorCallback = $(set).attr("data-ur-error-callback") || options.errorCallback;
    var geocoder;
    var geocodeObj;
    var currentObj;

    function selectHelper(elm, value) {
      for (var i=0,j=elm.length; i<j; i++) {
        if (elm[i].value === value.long_name || elm[i].value.toUpperCase() === value.short_name) {
          elm.selectedIndex = i;
        }
      }
    }

    function fieldHelper(elm, geoInfo, htmlElmType) {
      var index1 = 0;
      var index2 = null; // used for street address
      var need = null;
      var temp = null;
      var self = $(elm).attr("data-ur-reverse-geocode-component");
      switch(self) {
        case 'rg-city':
          need = 'locality';
          break;
        case 'rg-street':
          need = 'street_number';
          break;
        case 'rg-zip':
          need = 'postal_code';
          break;
        case 'rg-state':
          need = 'administrative_area_level_1';
          break;
        case 'rg-country':
          need = 'country';
          break;
      }
      temp=geoInfo[0];
      var myTemp = null;
      for (var i = temp.address_components.length, j=0; j<i; j++) {
        for (var k = temp.address_components[j].types.length, m=0; m<k; m++) {
          myTemp = temp.address_components[j].types[m];
          if (need == myTemp) {
            switch(myTemp) {
              case 'street_number':
                index1 = j;
                index2 = j+1;
                break;
              case 'locality':
                index1 = j;
                break;
              case 'postal_code':
                index1 = j;
                break;
              case 'administrative_area_level_1':
                index1 = j;
                break;
              case 'country':
                index1 = j;
            }
            break;
          }
        }
      }
      if (htmlElmType === "input") {
        if (index2 === null) {
          elm.value = geoInfo[0].address_components[index1].long_name;
        } else {
          elm.value = geoInfo[0].address_components[index1].long_name + " " + geoInfo[0].address_components[index2].long_name;
        }
      } else if (htmlElmType === "select") {
        selectHelper(elm, geoInfo[0].address_components[index1]);
      }
    }

    function populateFields (geoInfo) {
      var elements = currentObj.elements;
      for (elm in elements) {
        if (elements[elm].localName === "input") {
          fieldHelper(elements[elm], geoInfo, "input")
        }
        else if (elements[elm].localName === "select") {
          fieldHelper(elements[elm], geoInfo, "select")
        }
      }
    }

    this.setupCallbacks = function () {
      currentObj = this;
      // Set up call back for button to trigger geocoding
      var btn = this["elements"]["rg-button"];
      if (btn) {
        $(btn).on(
          "click.ur.inputclear",
          function(obj){
            return function() {
              obj.geocodeInit();
            }
          }(this)
        );
      } else {
        console.warn("no button for triggering reverse geocoding present");
        this.geocodeInit();
      }
    };

    this.geoSuccess = function( position ){
      var coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.codeLatLng(coords.lat, coords.lng);
    },

    this.geoError = function( error ){
      console.error("Ur geolocation error -- Error Getting Your Coordinates!");
      switch(error.code)
      {
        case error.TIMEOUT:
          console.error ('Ur geolocation error -- Timeout');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error ('Ur geolocation error -- Position unavailable');
          break;
        case error.PERMISSION_DENIED:
          console.error ('Ur geolocation error -- Permission denied');
          break;
        case error.UNKNOWN_ERROR:
          console.error ('Ur geolocation error -- Unknown error');
          break;
      }
      if (typeof errorCallback == "function")
        errorCallback();
      else
        eval(errorCallback);
    }

    this.geoDenied = function() {
      console.error("Ur geolocation error -- User Denied Geolocation");
    }

    this.codeLatLng = function( lat, lng ) {
      var latlng = new google.maps.LatLng(lat, lng);
      var self = this;

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            geocodeObj = results;
            populateFields(geocodeObj);

            if (typeof callback == "function")
                callback();
            else
              eval(callback);

            return results;
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        }
      });
    }

    this.geocodeInit = function () {
      if(navigator.geolocation){ //feature detect
        geocoder = new google.maps.Geocoder();
        navigator.geolocation.getCurrentPosition(
          function(obj){
            return function(position){
              obj.geoSuccess(position);
            };
          }(this),
          function(obj) {
            return function(errors){
              obj.geoError(errors);
            };
          }(this),
          this.geoDenied
        );
      }
    }

    UrGeocode = function( obj ) {
      return function() {
        obj.setupCallbacks();
      };
    }(this);
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = "https://maps.googleapis.com/maps/api/js?sensor=true&callback=UrGeocode";
    $('head').append(s);
    
    $(group["set"]).data("urInit", true);
  });
};

// Zoom
interactions.zoom = function ( fragment, options ) {
  options = $.extend({touch: true}, options);
  if (isPlainObj(fragment)) {
    var groups = assignElements(fragment, "zoom", function(set) {
      set.img = [];
      $.each(set.imgs, function() {
        $(this.img).attr({
          "data-ur-zoom-component": "img",
          "data-ur-width": this.width,
          "data-ur-height": this.height,
          "data-ur-src": this.src});
        set.img.push($(this.img));
      });
      $(set.loading).attr({"data-ur-zoom-component": "loading", "data-ur-state": "disabled"});
    });
  }
  else
    var groups = findElements(fragment, "zoom");

  // Private shared variables

  var loadedImgs = []; // sometimes the load event doesn't fire when the image src has been previously loaded

  $.each(groups, function(id, group) {
    Uranium.zoom[id] = new Zoom(this);
    $(group["set"]).data("urInit", true);
  });

  function Zoom(set) {
    var self = this;
    var zoomer = this;
    this.container = set["set"];
    this.img = set["img"];
    this.state = "disabled";

    // Optionally:
    this.button = set["button"];
    this.idler = set["loading"];

    var $container = $(this.container);
    var $img;
    var $idler = $(this.idler);
    var $btn = $(this.button);

    var relX, relY;
    var offsetX = 0, offsetY = 0;
    var destOffsetX = 0, destOffsetY = 0;
    var touchX = 0, touchY = 0;
    var mouseDown = false; // only used on non-touch browsers
    var mouseDrag = true;

    var translatePrefix = "translate(", translateSuffix = ")";
    var scalePrefix = " scale(", scaleSuffix = ")";

    var startCoords, click, down; // used for determining if zoom element is actually clicked

    // momentum sliding
    var frictionTime, frictionTimer;
    var dx1 = 0, dy1 = 0;
    var dx2 = 0, dy2 = 0;
    var time1 = 0, time2 = 0;
    var slidex, slidey;

    this.transform3d = transform3d;
    var custom3d = $container.attr("data-ur-transform3d");
    if (custom3d)
      this.transform3d = custom3d != "disabled";
    else if ("transform3d" in options)
      this.transform3d = options.transform3d;
      
    if (self.transform3d) {
      translatePrefix = "translate3d(";
      translateSuffix = ",0)";
      scalePrefix = " scale3d(";
      scaleSuffix = ",1)";
    }

    $(self.img).each(function() {
      loadedImgs.push($(this).attr("src"));
      $(this).data("urZoomImg", new Img(this));
    });

    function setActive(img) {
      if ($img && img != $img[0]) {
        self.state = "enabled-out";
        var zoomImg = $img.data("urZoomImg");
        zoomImg.transform(0, 0, 1);
        zoomImg.transitionEnd();
      }
      $img = $(img);
    }

    // zoom in/out button, zooms in to the center of the image
    $(self.button).on(touchscreen ? "touchstart.ur.zoom" : "click.ur.zoom", function() {
      if (self.img.length > 1)
        setActive($(self.img).filter($container.find("[data-ur-state='active'] *"))[0]);
      else
        setActive(self.img[0]);
      $img.data("urZoomImg").zoom();
    });

    function Img(img) {
      var self = this;
      var $img = $(img);
      var canvasWidth, canvasHeight;
      var width, height;
      var bigWidth, bigHeight;
      var boundX, boundY;
      var ratio;
      var prescale;
      
      function initialize() {
        $container.attr("data-ur-transform3d", zoomer.transform3d ? "enabled" : "disabled");
        
        canvasWidth = canvasWidth || $img.parent().outerWidth();
        canvasHeight = canvasHeight || $img.parent().outerHeight();
        width = width || parseInt($img.attr("width")) || parseInt($img.css("width")) || $img[0].width;
        height = height || parseInt($img.attr("height")) || parseInt($img.css("height")) || $img[0].height;
        
        bigWidth = parseInt($img.attr("data-ur-width")) || $img[0].naturalWidth;
        bigHeight = parseInt($img.attr("data-ur-height")) || $img[0].naturalHeight;
        
        if (!$img.attr("data-ur-src"))
          $img.attr("data-ur-src", $img.attr("src"));
        
        if (($img.attr("data-ur-width") && $img.attr("data-ur-height")) || $img.attr("src") == $img.attr("data-ur-src"))
          prescale = true;
        
        ratio = bigWidth/width;
        
        boundX = (bigWidth - canvasWidth)/2;    // horizontal translation to view middle of image
        boundY = (bigHeight - canvasHeight)/2;  // vertical translation to view middle of image
      }

      function panStart(event) {
        if (zoomer.state == "enabled-slide") {
          setState("enabled");
          var t = (Date.now() - frictionTime) / 300;
          if (t < 1) {
            clearTimeout(frictionTimer);
            var cb = 1 - Math.pow(1 - t, 1.685); // approximate cubic bezier y(x)
            var currentOffsetX = bound(destOffsetX + cb * slidex, [-boundX, boundX]);
            var currentOffsetY = bound(destOffsetY + cb * slidey, [-boundY, boundY]);
            transform(currentOffsetX, currentOffsetY, ratio);
          }
        }
      
        mouseDrag = false;
        touchX = event.pageX;
        touchY = event.pageY;
        mouseDown = true;
        var coords = getEventCoords(event);
        touchX = coords.x;
        touchY = coords.y;

        var style = $img[0].style;
        if (window.WebKitCSSMatrix) {
          var matrix = new WebKitCSSMatrix(style.webkitTransform);
          offsetX = matrix.m41;
          offsetY = matrix.m42;
        }
        else {
          var css = style.MozTransform || style.msTransform || style.transform || "translate(0, 0)";
          css = css.replace(/.*?\(|\)/, "").split(",");

          offsetX = parseInt(css[0]);
          offsetY = parseInt(css[1]);
        }

        stifle(event);
      }

      function panMove(event) {
        if (!mouseDown) // NOTE: mouseDown should always be true on touch-enabled devices
          return;

        stifle(event);
        var coords = getEventCoords(event);
        var x = coords.x;
        var y = coords.y;
        var dx = x - touchX;
        var dy = y - touchY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5)
          mouseDrag = true;
        destOffsetX = bound(offsetX + dx, [-boundX, boundX]);
        destOffsetY = bound(offsetY + dy, [-boundY, boundY]);
        transform(destOffsetX, destOffsetY, ratio);
        dx1 = dx2;
        dy1 = dy2;
        dx2 = dx;
        dy2 = dy;
        time1 = time2;
        time2 = Date.now();
      }

      function panEnd(event) {
        if (!mouseDrag)
          self.zoomOut();
        else if (Date.now() < time2 + 50)
          slide();
        stifle(event);
        mouseDown = false;
        mouseDrag = true;
      }
    
      function slide() {
        setState("enabled-slide");
        var ddx = dx2 - dx1, ddy = dy2 - dy1;
        var scalar = 100 * Math.sqrt((ddx * ddx + ddy * ddy)/(dx2 * dx2 + dy2 * dy2))/(time2 - time1);
        slidex = scalar * dx2;
        slidey = scalar * dy2;
        var newOffsetX = bound(destOffsetX + slidex, [-boundX, boundX]);
        var newOffsetY = bound(destOffsetY + slidey, [-boundY, boundY]);
        transform(newOffsetX, newOffsetY, ratio);
        frictionTime = Date.now();
        frictionTimer = setTimeout(function() {
          setState("enabled");
        }, 300);
      }

      this.transitionEnd = function() {
        if (zoomer.state == "enabled-in") {
          $img.css({ webkitTransitionDelay: "", MozTransitionDelay: "", OTransitionDelay: "", transitionDelay: "" });

          $img.attr("src", $img.attr("data-ur-src"));
          if (loadedImgs.indexOf($img.attr("data-ur-src")) == -1) {
            setTimeout(function() {
              if (loadedImgs.indexOf($img.attr("data-ur-src")) == -1)
                $idler.attr("data-ur-state", "enabled");
            }, 16);
          }
          setState("enabled");

          $img
            .on(downEvent + ".zoom", panStart)
            .on(moveEvent + ".zoom", panMove)
            .on(upEvent + ".zoom", panEnd);
        }
        else if (zoomer.state == "enabled-out") {
          setState("disabled");

          $img
            .off(downEvent + ".zoom", panStart)
            .off(moveEvent + ".zoom", panMove)
            .off(upEvent + ".zoom", panEnd);
        }
      }

      function setState(state) {
        zoomer.state = state;
        $img.attr("data-ur-state", state);
        if (zoomer.img.length == 1)
          $container.attr("data-ur-state", state); // backwards compatibility
      }

      function zoomHelper(x, y) {
        $btn.attr("data-ur-state", "enabled");
        setState("enabled-in");

        transform(x || 0, y || 0, ratio);
      }

      function relativeCoords(event) {
        var coords = getEventCoords(event);
        var rect = event.target.getBoundingClientRect();
        return {
          x: coords.x - rect.left,
          y: coords.y - rect.top,
          x2: coords.x2 - rect.left,
          y2: coords.y2 - rect.top
        };
      }

      this.transform = transform;
      function transform(x, y, scale) {
        var t = "";
        if (x != null)
          t = translatePrefix + x + "px, " + y + "px" + translateSuffix;
        if (scale != null)
          t += scalePrefix + scale + ", " + scale + scaleSuffix;
      
        return $img.css({ webkitTransform: t, MozTransform: t, msTransform: t, transform: t });
      }

      // attempts to zoom in centering in on the area that was touched
      this.zoomIn = function(event) {
        if (zoomer.state != "disabled")
          return;

        if (!width) {
          initialize();
          $img.css("width", width + "px");
          $img.css("height", height + "px");
        }

        // find touch location relative to image
        var relCoords = relativeCoords(event);
        relX = relCoords.x;
        relY = relCoords.y;

        if (!prescale) {
          zoomer.state = "enabled-in";
          $img.attr("src", $img.attr("data-ur-src"));
          setTimeout(function() {
            if (!prescale)
              $idler.attr("data-ur-state", "enabled");
          }, 0);
        }
        else {
          var translateX = bound(bigWidth/2 - ratio * relX, [-boundX, boundX]);
          var translateY = bound(bigHeight/2 - ratio * relY, [-boundY, boundY]);
          zoomHelper(translateX, translateY);
        }
      };

      this.zoomOut = function() {
        if (zoomer.state != "enabled")
          return;
        $btn.attr("data-ur-state", "disabled");
        setState("enabled-out");
        transform(0, 0, 1);
      };

      if ($container.attr("data-ur-touch") != "disabled" || options.touch) {
        // make sure zoom works when dragged inside carousel
        $img.on(downEvent + ".zoom", function(e) {
          click = down = true;
          startCoords = getEventCoords(e);
        });
        $img.on(moveEvent + ".zoom", function(e) {
          var coords = getEventCoords(e);
          if (down && (Math.abs(startCoords.x - coords.x) + Math.abs(startCoords.x - coords.x)) > 0)
            click = false;
        });
        $img.on("click.ur.zoom", function(e) {
          if (click) {
            setActive(this);
            if (this == $img[0])
              self.zoomIn(e);
          }
        });
      }

      $img.on("load.ur.zoom", function() {
        if ($img.attr("src") == $img.attr("data-ur-src"))
          loadedImgs.push($img.attr("src"));
        $idler.attr("data-ur-state", "disabled");
        if (!prescale && zoomer.state == "enabled-in") {
          prescale = true;
          initialize();
          var translateX = bound(bigWidth/2 - ratio * relX, [-boundX, boundX]);
          var translateY = bound(bigHeight/2 - ratio * relY, [-boundY, boundY]);

          var delay = "0.3s";
          $img.css({ webkitTransitionDelay: delay, MozTransitionDelay: delay, OTransitionDelay: delay, transitionDelay: delay });

          zoomHelper(translateX, translateY);
        }
      });

      // zooms in to the center of the image
      this.zoom = function() {
        if (zoomer.state == "disabled") {
          if (!width) {
            initialize();
            $img.css("width", width + "px");
            $img.css("height", height + "px");
          }

          if (prescale)
            zoomHelper(0, 0);
          else {
            zoomer.state = "enabled-in";
            $img.attr("src", $img.attr("data-ur-src"));
            setTimeout(function() {
              // if prescale ?
              if (loadedImgs.indexOf($img.attr("data-ur-src")) == -1)
                $idler.attr("data-ur-state", "enabled");
            }, 0);
          }
        }
        else
          self.zoomOut();
      };

      $img.on("webkitTransitionEnd.ur.zoom transitionend.ur.zoom", this.transitionEnd);
    }
  }
};

// Carousel
interactions.carousel = function ( fragment, options ) {
  if (isPlainObj(fragment))
    var groups = assignElements(fragment, "carousel");
  else
    var groups = findElements(fragment, "carousel");

  // for each carousel
  $.each(groups, function(id, group) {
    $(group["buttons"]).each(function() {
      var type = $(this).attr("data-ur-carousel-button-type");
      if(!type) {
        $.error("malformed carousel button type for carousel with id: " + id);
      }
      $(this).attr("data-ur-state", type == "prev" ? "disabled" : "enabled");
    });
    Uranium.carousel[id] = new Carousel(group, options);
    $(group["set"]).data("urInit", true);
    $(group["set"]).attr("data-ur-state", "enabled"); // should be data-ur-init or fire event
  });

  // private methods

  function zeroFloor(num) {
    return num >= 0 ? Math.floor(num) : Math.ceil(num);
  }

  function Carousel(set, options) {
    var self = this;
    self.urId = set["_id"];
    self.container = set["set"];
    self.scroller = set["scroll_container"];
    if (!self.scroller)
      $.error("carousel missing item components");
    self.items = set["item"] || [];

    // Optionally:
    self.button = {
      prev: $(set["button"]).filter("[data-ur-carousel-button-type='prev']"),
      next: $(set["button"]).filter("[data-ur-carousel-button-type='next']")
    };
    self.counter = set["count"];
    self.dots = set["dots"];

    self.flag = {
      click: true,            // used for determining if item is clicked on touchscreens
      snapping: false,        // true if carousel is currently snapping, flag for users' convenience
      lock: null,             // used for determining horizontal/vertical dragging motion on touchscreens
      touched: false          // true when user is currently touching/dragging
    };

    self.options = {
      autoscroll: false,
      autoscrollDelay: 5000,
      autoscrollForward: true,
      center: false,            // position active item in the middle of the carousel
      cloneLength: 0,           // number of clones at back of carousel (or front and back for centered carousels)
      fill: 0,                  // exactly how many items forced to fit in the viewport, 0 means disabled
      infinite: true,           // loops the last item back to first and vice versa
      speed: 1.1,               // determines how "fast" carousel snaps, should probably be deprecated
      transform3d: transform3d, // determines if translate3d() or translate() is used
      touch: true               // determines if carousel can be dragged e.g. when user only wants buttons to be used
    };

    $.extend(self.options, options);

    self.count = self.items.length;     // number of items (excluding clones)
    self.itemIndex = 0;                 // index of active item (including clones)
    self.translate = 0;                 // current numerical css translate value

    var $container = $(self.container);
    var $items = $(self.items);         // all carousel items (including clones)
    var coords = null;
    var prevCoords;                     // stores previous coords, used for determining swipe direction
    var startCoords = {x: 0, y: 0};
    var shift = 0;                      // in range [0, 1) or [-0.5, 0.5) for centered carousels showing translate percentage past top/left side of active item
    var dest = $items[0];               // snap destination element
    var destinationOffset;              // translate value of destination
    var lastIndex = self.count - 1;     // index of last item
    var allItemsWidth;                  // sum of all items' widths (excluding clones)
    var autoscrollId;                   // used for autoscrolling timeout
    var momentumId;                     // used for snapping timeout

    var isThisInit = true;              // check if we are initalizeing

    var viewport = $container.outerWidth();

    var startingOffset = null;

    var translatePrefix = "translate3d(", translateSuffix = ", 0)";

    function initialize() {
      if (!self.options.transform3d) {
        translatePrefix = "translate(";
        translateSuffix = ")";
      }

      $items.each(function(i, obj) {
        if ($(obj).attr("data-ur-state") == "active") {
          self.itemIndex = i;
          return false;
        }
      });

      insertClones();
      updateDots();
      updateIndex(self.options.center ? self.itemIndex + self.options.cloneLength : self.itemIndex);
      self.update();

      $(self.scroller).on("dragstart.ur.carousel", function() { return false; }); // for Firefox

      if (self.options.touch) {
        $(self.scroller)
          .on(downEvent + ".carousel", startSwipe)
          .on(moveEvent + ".carousel", continueSwipe)
          .on(upEvent + ".carousel", finishSwipe);
        $(self.scroller).each(function() {
          this.addEventListener("click", function(e) {
            if (!self.flag.click)
              stifle(e);
          }, true);
        });
      }

      self.button.prev.on("click.ur.carousel", function() {
        moveTo(1);
      });
      self.button.next.on("click.ur.carousel", function() {
        moveTo(-1);
      });

      if ("onorientationchange" in window && !/Android/.test(navigator.userAgent))
        $(window).on("orientationchange.ur.carousel", function() { self.update(); });
      else
        $(window).on("resize.ur.carousel", function() {
          if (viewport != $container.outerWidth())
            self.update();
        });

      $items.find("img").addBack("img").on("load.ur.carousel", function() { self.update(); }); // after any (late-loaded) images are loaded

      self.autoscrollStart();

      $container.triggerHandler("load.ur.carousel");
      isThisInit = false;
    }

    function readAttributes() {
      var custom3d = $container.attr("data-ur-android3d") || $container.attr("data-ur-transform3d");
      if (custom3d)
        self.options.transform3d = custom3d != "disabled";
      $container.attr("data-ur-transform3d", self.options.transform3d ? "enabled" : "disabled");
      if (oldAndroid && !self.options.transform3d) {
        var speed = parseFloat($container.attr("data-ur-speed"));
        self.options.speed = speed > 1 ? speed : 1.3;
      }
      $container.attr("data-ur-speed", self.options.speed);

      var fill = parseInt($container.attr("data-ur-fill"));
      if (fill > 0)
        self.options.fill = fill;
      $container.attr("data-ur-fill", self.options.fill);

      var cloneLength = $container.attr("data-ur-clones");
      if (cloneLength)
        self.options.cloneLength = parseInt(cloneLength);
      $container.attr("data-ur-clones", self.options.cloneLength);

      var autoscrollDelay = parseInt($container.attr("data-ur-autoscroll-delay"));
      if (autoscrollDelay >= 0)
        self.options.autoscrollDelay = autoscrollDelay;
      $container.attr("data-ur-autoscroll-delay", self.options.autoscrollDelay);

      var autoscrollDir = $container.attr("data-ur-autoscroll-dir");
      if (autoscrollDir)
        self.options.autoscrollForward = autoscrollDir != "prev";
      $container.attr("data-ur-autoscroll-dir", self.options.autoscrollForward ? "next" : "prev");

      // read boolean attributes
      $.each(["autoscroll", "center", "infinite", "touch"], function(_, name) {
        var dashName = "data-ur-" + name.replace(/[A-Z]/g, function(i) { return "-" + i.toLowerCase()});
        var value = $container.attr(dashName);
        if (value == "enabled")
          self.options[name] = true;
        else if (value == "disabled")
          self.options[name] = false;

        $container.attr(dashName, self.options[name] ? "enabled" : "disabled");
      });
    }

    function insertClones() {
      if (!self.options.infinite) {
        self.options.cloneLength = 0;
        $container.attr("data-ur-clones", 0);
        return;
      }

      if (self.options.cloneLength == 0) {
        if (self.options.fill)
          self.options.cloneLength = self.options.center ? Math.min(1, self.options.fill - 1) : self.options.fill;
        else if (self.options.center) {
          // insert enough clones at front and back to never see a blank space
          var cloneLengths = [0, 0];
          var space = viewport/2 + width($items[lastIndex])/2;
          for (var i = lastIndex; space > 0; i = (i - 1 + self.count) % self.count) {
            space -= width($items[i]);
            cloneLengths[0]++;
          }

          space = viewport/2 + width($items[0])/2;
          for (var i = 0; space > 0; i = (i + 1) % self.count) {
            space -= width($items[i]);
            cloneLengths[1]++;
          }

          self.options.cloneLength = Math.max(cloneLengths[0], cloneLengths[1]);
        }
        else {
          // insert enough clones at the back to never see a blank space
          var space = viewport;
          var i = 0;
          while (space > 0) {
            space -= width($items[i]);
            self.options.cloneLength++;
            i = (i + 1) % $items.length;
          }
        }
      }

      $container.attr("data-ur-clones", self.options.cloneLength);

      var frag = document.createDocumentFragment();
      for (var i = 0; i < self.options.cloneLength; i++) {
        var srcIndex = i % self.count;
        var clone = $items.eq(srcIndex).clone(true).attr("data-ur-clone", srcIndex).attr("data-ur-state", "inactive");
        frag.appendChild(clone[0]);
      }
      $items.parent().append(frag);

      if (self.options.center) {
        frag = document.createDocumentFragment()
        var offset =  self.count - (self.options.cloneLength % self.count);
        for (var i = offset; i < offset + self.options.cloneLength; i++) {
          var srcIndex = i % self.count;
          var clone = $items.eq(srcIndex).clone(true).attr("data-ur-clone", srcIndex).attr("data-ur-state", "inactive");
          frag.appendChild(clone[0]);
        }
        $items.parent().prepend(frag);
      }

      $items = $(self.scroller).find("[data-ur-carousel-component='item']");
      lastIndex = $items.length - 1;
    }

    function updateDots() {
      if (self.dots) {
        var existing = $(self.dots).find("[data-ur-carousel-component='dot']");
        if (existing.length != self.count) {
          existing.remove();
          var dot = $("<div data-ur-carousel-component='dot'>");
          var storage = document.createDocumentFragment();
          for (var i = 0; i < self.count; i++) {
            var newdot = dot.clone();
            storage.appendChild(newdot[0]);
          }
          $(self.dots).append(storage);
        }
      }
    }

    self.update = function(options) {
      if (options)
        $.extend(self.options, options);
      var oldCount = $items.length;
      $items = $(self.scroller).find("[data-ur-carousel-component='item']");
      if (oldCount != $items.length) {
        self.items = $items.filter(":not([data-ur-clone])").toArray();
        self.count = self.items.length;
        lastIndex = $items.length - 1;

        $items.each(function(i, obj) {
          if ($(obj).attr("data-ur-state") == "active") {
            self.itemIndex = i;
            return false;
          }
        });

        // in case the previous active item was removed
         if (self.itemIndex >= $items.length - self.options.cloneLength) {
          self.itemIndex = lastIndex - self.options.cloneLength;
          $items.eq(self.itemIndex).attr("data-ur-state", "active");
        }

        // in the rare case the destination element was (re)moved
        if (!self.scroller.contains(dest))
          dest = $items[self.itemIndex];

        updateDots();
        updateIndex(self.options.center ? self.itemIndex + self.options.cloneLength : self.itemIndex);
      }

      viewport = $container.outerWidth();
      // Adjust the container to be the necessary width.
      var totalWidth = 0;

      // pixel-perfect division, slightly inefficient?
      var divisions = [];
      if (self.options.fill > 0) {
        var remainder = viewport;
        for (var i = self.options.fill; i > 0; i--) {
          var length = Math.round(remainder/i);
          divisions.push(length);
          remainder -= length;
        }
      }

      allItemsWidth = 0;
      for (var i = 0; i < $items.length; i++) {
        if (self.options.fill > 0) {
          var length = divisions[i % self.options.fill];
          var item = $items.eq(i);
          // set outerWidth regardless of box-sizing
          item.css("width", length + parseInt(item.css("width")) - item.outerWidth()); // could add true param if margins allowed
          totalWidth += length;
        }
        else
          totalWidth += width($items[i]);

        if (i <= lastIndex - self.options.cloneLength && i >= (self.options.center ? self.options.cloneLength : 0))
          allItemsWidth += width($items[i]);
      }

      $(self.scroller).width(totalWidth);

      var currentItem = $items[self.itemIndex];
      var newTranslate = -(offsetFront(currentItem) + shift * width(currentItem));
      destinationOffset = -offsetFront(dest);
      if (self.options.center) {
        newTranslate += centerOffset(currentItem);
        destinationOffset += centerOffset(dest);
      }
      translateX(newTranslate);
    };

    self.autoscrollStart = function() {
      if (!self.options.autoscroll)
        return;

      autoscrollId = setTimeout(function() {
        if (viewport != 0) {
          if (!self.options.infinite && self.itemIndex == lastIndex && self.options.autoscrollForward)
            self.jumpToIndex(0);
          else if (!self.options.infinite && self.itemIndex == 0 && !self.options.autoscrollForward)
            self.jumpToIndex(lastIndex);
          else
            moveTo(self.options.autoscrollForward ? -1 : 1);
        }
        else
          self.autoscrollStart();
      }, self.options.autoscrollDelay);
    };

    self.autoscrollStop = function() {
      clearTimeout(autoscrollId);
    };

    function updateButtons() {
      if (self.options.infinite)
        $([self.button.prev, self.button.next]).attr("data-ur-state", "enabled");
      else {
        $(self.button.prev).attr("data-ur-state", self.itemIndex == 0 ? "disabled" : "enabled");
        $(self.button.next).attr("data-ur-state", self.itemIndex == self.count - Math.max(self.options.fill, 1) ? "disabled" : "enabled");
      }
    }

    // execute side effects of new index
    function updateIndex(newIndex) {
      if (newIndex === undefined)
        return;

      self.itemIndex = newIndex;
      if (self.itemIndex < 0)
        self.itemIndex = 0;
      else if (self.itemIndex > lastIndex)
        self.itemIndex = lastIndex;

      var realIndex = self.itemIndex;
      if (self.options.infinite && self.options.center)
        realIndex = self.itemIndex - self.options.cloneLength;
      realIndex = realIndex % self.count;
      $(self.counter).html(function() {
        var template = $(this).attr("data-ur-template") || "{{index}} of {{count}}";
        return template.replace("{{index}}", realIndex + 1).replace("{{count}}", self.count);
      });

      $items.attr("data-ur-state", "inactive");
      $items.eq(self.options.center ? self.itemIndex : realIndex).attr("data-ur-state", "active");

      $(self.dots).find("[data-ur-carousel-component='dot']").attr("data-ur-state", "inactive").eq(realIndex).attr("data-ur-state", "active");

      updateButtons();
      if (!isThisInit)
        $container.triggerHandler("itemChange", {index: newIndex});
    }

    function startSwipe(e) {
      self.autoscrollStop();

      self.flag.touched = true;
      self.flag.lock = null;
      self.flag.click = true;

      coords = getEventCoords(e);

      startCoords = prevCoords = coords;
      startingOffset = getTranslateX();
    }

    function continueSwipe(e) {
      if (!self.flag.touched) // for non-touch environments since mousemove fires without mousedown
        return;

      prevCoords = coords;
      coords = getEventCoords(e);

      if (Math.abs(startCoords.y - coords.y) + Math.abs(startCoords.x - coords.x) > 0)
        self.flag.click = false;

      if (touchscreen) {
        var slope = Math.abs((startCoords.y - coords.y)/(startCoords.x - coords.x));
        if (self.flag.lock) {
          if (self.flag.lock == "y")
            return;
        }
        else if (slope > 1.2) {
          self.flag.lock = "y";
          return;
        }
        else if (slope <= 1.2)
          self.flag.lock = "x";
        else
          return;
      }

      stifle(e);

      if (coords !== null) {
        var dist = startingOffset + swipeDist(startCoords, coords); // new translate() value, usually negative

        var threshold = -dist;
        if (self.options.center)
          threshold += viewport/2;
        $items.each(function(i, item) {
          var boundStart = offsetFront(item);
          var boundEnd = boundStart + width(item);
          if (boundEnd > threshold) {
            self.itemIndex = i;
            shift = (threshold - boundStart)/width(item);
            if (self.options.center)
              shift -= 0.5;
            return false;
          }
        });

        if (self.options.infinite) {
          if (self.options.center) {
            if (self.itemIndex < self.options.cloneLength) { // at the start of carousel so loop to end
              startingOffset -= allItemsWidth;
              dist -= allItemsWidth;
              self.itemIndex += self.count;
            }
            else if (self.itemIndex >= self.count + self.options.cloneLength) { // at the end of carousel so loop to start
              startingOffset += allItemsWidth;
              dist += allItemsWidth;
              self.itemIndex -= self.count;
            }
          }
          else {
            if (shift < 0) { // at the start of carousel so loop to end
              startingOffset -= allItemsWidth;
              dist -= allItemsWidth;
              self.itemIndex += self.count;
              var item = $items[self.itemIndex];
              shift = (-dist - offsetFront(item))/width(item);
            }
            else if (self.itemIndex >= self.count) { // at the end of carousel so loop to start
              var offset = offsetFront($items[self.count]) - offsetFront($items[0]); // length of all original items
              startingOffset += offset;
              dist += offset;
              self.itemIndex -= self.count;
            }
          }
        }
        translateX(dist);
      }

    }

    function finishSwipe(e) {
      if (!self.flag.touched) // for non-touch environments since mouseup fires without mousedown
        return;

      if (!self.flag.click || self.flag.lock)
        stifle(e);
      else if (e.target.tagName == "AREA")
        location.href = e.target.href;

      self.flag.touched = false;

      var dir = coords.x - prevCoords.x;
      if (self.options.center) {
        if (dir < 0 && shift > 0)
          moveTo(-1)
        else if (dir > 0 && shift < 0)
          moveTo(1);
        else
          moveTo(0);
      }
      else
        moveTo(dir < 0 ? -1: 0);
    }

    function moveTo(direction) {
      self.autoscrollStop();

      // in case prev/next buttons are being spammed
      clearTimeout(momentumId);

      var newIndex = self.itemIndex - direction;
      if (!self.options.infinite) {
        if (self.options.fill > 0  && !self.options.center)
          newIndex = bound(newIndex, [0, self.count - self.options.fill]);
        else
          newIndex = bound(newIndex, [0, lastIndex]);
      }

      // when snapping to clone, prepare to snap back to original element
      if (self.options.infinite) {
        var transform = getTranslateX();
        if (self.options.center) {
          if (newIndex < self.options.cloneLength) { // clone at start of carousel so loop to back
            translateX(transform - allItemsWidth);
            newIndex += self.count;
            self.itemIndex = newIndex + direction;
          }
          else if (newIndex >= self.count + self.options.cloneLength) { // clone at end of carousel so loop to front
            translateX(transform + allItemsWidth);
            newIndex -= self.count;
            self.itemIndex = newIndex + direction;
          }

        }
        else {
          if (newIndex < 0) { // at start of carousel so loop to back
            translateX(transform - allItemsWidth);
            newIndex += self.count;
            self.itemIndex = newIndex + direction;
          }
          else if (newIndex > self.count) { // clone at end of carousel so loop to start
            translateX(transform + allItemsWidth);
            newIndex -= self.count;
            self.itemIndex = newIndex + direction;
          }

        }
      }

      dest = $items[newIndex];
      $container.triggerHandler("slidestart", {index: newIndex});

      // timeout needed for mobile safari
      setTimeout(function() {
        snapTo();
        updateIndex(newIndex);
      }, 0);
    }

    function snapTo() {
      destinationOffset = -offsetFront(dest);
      if (self.options.center)
        destinationOffset += centerOffset(dest);

      function momentum() {
        // in case user touched in the middle of snapping
        if (self.flag.touched)
          return;

        var translate = getTranslateX();
        var distance = destinationOffset - translate;
        var delta = distance - zeroFloor(distance / self.options.speed);

        // Hacky -- this is for the desktop browser only -- to fix rounding errors
        // Ideally, this is removed at compile time
        if(Math.abs(delta) < 0.01)
          delta = 0;

        var newTransform = translate + delta;
        translateX(newTransform);

        self.flag.snapping = delta != 0;
        if (self.flag.snapping)
          momentumId = setTimeout(momentum, 16);
        else
          endSnap();
      }

      momentum();
    }

    function endSnap() {
      // infinite, non-centered carousels when swiping from last item back to first can't switch early in moveTo() since no clones at front
      if (self.options.infinite && !self.options.center && self.itemIndex >= self.count) {
        translateX(getTranslateX() + allItemsWidth);
        self.itemIndex -= self.count;
      }
      shift = 0;
      self.flag.click = true;
      self.autoscrollStart();
      $container.triggerHandler("slideend", {index: self.itemIndex});
    }

    self.jumpToIndex = function(index) {
      moveTo(self.itemIndex - index);
    };

    // could be end.y - start.y if vertical option implemented
    function swipeDist(start, end) {
      return end.x - start.x;
    }

    function translateX(x) {
      self.translate = x;
      var css = translatePrefix + x + "px, 0px" + translateSuffix;
      $(self.scroller).css({webkitTransform: css, MozTransform: css, msTransform: css, transform: css});
    }

    function getTranslateX() {
      return self.translate;
    }

    // could possibly be $(item).outerWidth(true) if margins are allowed
    function width(item) {
      return item.offsetWidth;
    }

    // .offsetLeft/Top, could includ margin as "part" of the element with - parseInt($(item).css("marginLeft"))
    function offsetFront(item) {
      return item.offsetLeft;
    }

    // offset needed to center element, round since subpixel translation makes images blurry
    function centerOffset(item) {
      return Math.floor((viewport - width(item))/2);
    }

    readAttributes();

    // delay initialization until we can figure out number of clones
    var zeroWidth = false;
    if (self.options.infinite && !self.options.fill && self.options.cloneLength == 0) {
      $items.width(function(i, width) {
        if (width == 0)
          zeroWidth = true;
      });
    }
    if (zeroWidth) {
      // wait until (late-loaded) images are loaded or other content inserted
      console.warn("carousel with id: " + self.urId + " will be late loaded");
      var imgs = $items.find("img").addBack("img").filter(function() {
        return this.naturalWidth == 0 || this.width == 0;
      });
      var numImgs = imgs.length;
      if (numImgs > 0)
        imgs.on("load.ur.carousel", function() {
          if (--numImgs == 0)
            initialize();
        });
      else
        $(window).on("load.ur.carousel", initialize);
    }
    else
      initialize();

  }
};

var Ur = {lib: interactions, options: {}};
window.Uranium = Ur;
$.each(interactions, function(name) {
  Ur[name] = {};
});

$.fn.Uranium = function() {
  var jqObj = this;
  $.each(interactions, function() {
    this(jqObj);
  });
  return this;
};

Ur.options.setup = function() {
  $(document).Uranium();
};

$(function() { Ur.options.setup(); });

})(jQuery);



/*
 * File: body/mw.Nytime-js.base.js
 */
mw.Nytime-js.Base = function() {

  function initialize() {
    
  }


  return {
    init: initialize,
    name: "mw-global"
  }
}();



/*
 * File: body/stub.js
 */
// Delete me when ready
