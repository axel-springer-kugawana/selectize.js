/**
 * Plugin: "clear_button" (selectize.js)
 * @author Patryk <https://github.com/pwasiewicz>
 */

Selectize.define('clear_button', function (options) {
  /**
   * Escapes a string for use within HTML.
   *
   * @param {string} str
   * @returns {string}
   */
  var escape_html = function (str) {
      return (str + '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
  };

  options = $.extend({
      label: 'icon-close',
      title: 'Remove',
      className: 'selectize-clear',
      append: true,
      hideWhenEmpty: true,
      leaveOpen: false
  }, options);

  var self = this,
      $html = $('<span style="display:none;" class="' +
          options.className +
          '" tabindex="-1" title="' +
          escape_html(options.title) +
          '">' +
          options.label +
          '</span>');


  this.setup = (function () {
      var original = self.setup;
      return function () {
          // override the item rendering method to add the button to each
          original.apply(this, arguments);

          this.$wrapper.append($html);

          if (options.hideWhenEmpty) {
              var $input = this.$input;
              var hideShowClrBtn = function ($inpt) {
                  var val = $inpt.val();
                  if (val) {
                      $html.show();
                  } else {
                      $html.hide();
                  }
              }

              setTimeout(function() {
                  hideShowClrBtn($input)
              });

              $input.change(function () {
                  hideShowClrBtn($input);
              });
          }

          // add event listener
          $html.on('click', function (e) {
              e.preventDefault();
              if (self.isLocked) return;
              self.clear();

              if (options.leaveOpen) {
                  self.$control_input.focus();
              }
          });
      };
  })();
});