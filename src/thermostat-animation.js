// Copyright (c) 2025 by Simone Bernabè (https://codepen.io/simoberny/pen/wrGoZZ)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var gradi = 19;
var max = 34;
var min = 2;

function updateGr(){
  $(".heat").text("" + gradi);
  $(".ext").text("" + gradi);
  $(".number").css("transform", "translate(-50%, -50%) rotate("+ (-180 + gradi * 10)+"deg)");
  $(".shadow").css("transform", "translate(-50%, -50%) rotate("+ (-180 + gradi * 10)+"deg)");
  $(".fill").css("animation", "none");
  $(".shadow").css("animation", "none");
}


$(".minus").mousedown(function(){ 
  if(gradi > min){
    gradi--;
    updateGr();
    if(gradi >= 18){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "0s");
    }else if(gradi == 17){
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0.5s");  
    }else{
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0s");
    }
  }
});

$(".plus").mousedown(function(){
  if(gradi < max){
    gradi++;
    updateGr();
    if(gradi > 19){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "0s");
    }else if(gradi == 19){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "1s"); 
    }else{
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0s");
    }
  }  
});

