$(document).ready(function() {
  var key = 'zzzz';

  var items = JSON.parse(localStorage.getItem(key)) || [];
  var $total = $(".total");
  var $list = $('#list');

  updateTotal();
  items.forEach(addHtml);

  function updateTotal(){
    var total = items.reduce(function(sum, item) {
      var value = item.cost;

      if (!value) {
        value = 0;
      }

      return parseFloat(value) + sum;
    }, 0).toFixed(2);

    $total.html(total)+" .grn";
  }

  function save(item){
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
  }

  function addHtml(item) {
    function createLi(item) {

      var date = new Date();//date
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getUTCDate();
      month = ("0" + (month + 1)).slice(-2);
      year = year.toString().substr(2,2);
      var formattedDate = day + '/' + month + "/" + year;

      function getId() {
        var count = $('#list tr').length;
        return (count+1);
      };

      return ["<tr><td>", [getId(), item.prod, item.cost, formattedDate].join("</td><td>"), "</td></tr>"].join('');
    }

    $list.append(createLi(item));
  };



  function tryToAdd() {
    var dataItem = getDataItem();

    if (!validItem(dataItem)) {
      return;
    }

    addHtml(dataItem);
    save(dataItem);
    updateTotal();
    document.forms["myform"].reset();
  };




  function getDataItem() {
    var item = {};

    item.prod = $("input[name=prod]").val().trim();
    item.cost = $("input[name=cost]").val().trim();

    //$('input').val("what kind of stuff");

    return item;
  }

  function validItem(item) {
    var predicate = false;
    var validProd = false;
    var validCost = false;

    validProd = item.prod.length > 0;

    if (item.cost.length > 0 && /^\d+[.,]?\d*$/.test(item.cost)) {
      validCost = true;
    };

    if (validProd && validCost) {
      predicate = true;
    }
    return predicate;
  }




  $('input:last').on('keyup', function(event){
    if(event.keyCode === 13) {
      tryToAdd();
    }
  });

  $('button').click(function(event) {
    event.preventDefault();
    tryToAdd();
  });

});
