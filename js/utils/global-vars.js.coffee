# Globally cache these frequently used variables
@westfield = {} unless westfield?
@westfield.components = {}
westfield.spacing =
  base: 21
@body = $('body')
@doc = $(document)
@pageContainer = $('.js-page-container')
@isOldIE = $('html').hasClass('ie-9')