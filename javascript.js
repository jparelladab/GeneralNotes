// Bind creates a new function that will force the this inside the function to be the parameter passed to bind().

// Here's an example that shows how to use bind to pass a member method around that has the correct this:

var myButton = {
    content: 'OK',
    click() {
      console.log(this.content + ' clicked');
    }
  };
  
  myButton.click();
  
  var looseClick = myButton.click;
  looseClick(); // not bound, 'this' is not myButton - it is the globalThis
  
  var boundClick = myButton.click.bind(myButton);
  boundClick(); // bound, 'this' is myButton
//   Which prints out:
  
  OK clicked
  undefined clicked
  OK clicked
//   You can also add extra parameters after the 1st (this) parameter and bind will pass in those values to the original function. Any additional parameters you later pass to the bound function will be passed in after the bound parameters:
  
  // Example showing binding some parameters
  var sum = function(a, b) {
    return a + b;
  };
  
  var add5 = sum.bind(null, 5);
  console.log(add5(10));
//   Which prints out:
  
//   15
//   Check out JavaScript Function bind for more info and interactive examples.
  
//   Update: ECMAScript 2015 adds support for => functions. => functions are more compact and do not change the this pointer from their defining scope, so you may not need to use bind() as often. For example, if you wanted a function on Button from the first example to hook up the click callback to a DOM event, the following are all valid ways of doing that:
  
  var myButton = {
    // ... // As above
    hookEvent(element) {
      // Use bind() to ensure 'this' is the 'this' inside click()
      element.addEventListener('click', this.click.bind(this));
    }
  };
//   Or:
  
  var myButton = {
    // ... // As above
    hookEvent(element) {
      // Use a new variable for 'this' since 'this' inside the function
      // will not be the 'this' inside hookEvent()
      var me = this;
      element.addEventListener('click', function() { me.click() });
    }
  };    
//   Or:
  
  var myButton = {
    // ... // As above
    hookEvent(element) {
      // => functions do not change 'this', so you can use it directly
      element.addEventListener('click', () => this.click());
    }
  };