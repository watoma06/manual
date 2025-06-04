// チェックボックスの処理
$(document).ready(function() {
  function updateTotal() {
    var total = $('.checklist-item:checked').length;
    $('#total').text(total);
  }

  $('.checklist-item').change(function() {
    updateTotal();
  });

  updateTotal(); // 初期化
});
