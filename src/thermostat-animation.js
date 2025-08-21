// Original work Copyright (c) 2025 by Simone Bernabè (https://codepen.io/simoberny/pen/wrGoZZ)
// Modified work Copyright (c) 2025 by Nat Gist (https://github.com/ngist/ha_guest_thermostat)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const midpoint_temp = (max_setpoint + min_setpoint)/2
const step_degrees = 320/(max_setpoint-min_setpoint)

function updateGr(){
  $(".main").text("" + setpoint);
  $(".ext").text("" + setpoint);
  $(".number").css("transform", "translate(-50%, -50%) rotate("+ ((setpoint-midpoint_temp) * step_degrees)+"deg)");
  $(".spoint").css("transform", "translate(-50%, -50%) rotate("+ ((setpoint-midpoint_temp) * step_degrees)+"deg)");
  $(".fill").css("animation", "none");
  $(".spoint").css("animation", "none");
}

function decrease_setpoint_animation(){ 
    updateGr();
    if(setpoint >= midpoint_temp){
      $(".fill1").css("transform", "rotate("+ (setpoint - midpoint_temp) * step_degrees +"deg)").css("transition-delay", "0s");
    }else if(setpoint == (midpoint_temp-1)){
      $(".fill2").css("transform", "rotate("+ ((setpoint - min_setpoint) * step_degrees + 20) +"deg)").css("transition-delay", "0.5s");  
    }else{
      $(".fill2").css("transform", "rotate("+ ((setpoint - min_setpoint) * step_degrees + 20) +"deg)").css("transition-delay", "0s");
    }
}

function increase_setpoint_animation(){
    updateGr();
    if(setpoint > (midpoint_temp+1)){
      $(".fill1").css("transform", "rotate("+ (setpoint - midpoint_temp) * step_degrees +"deg)").css("transition-delay", "0s");
    }else if(setpoint == (midpoint_temp+1)){
      $(".fill1").css("transform", "rotate("+ (setpoint - midpoint_temp) * step_degrees +"deg)").css("transition-delay", "1s"); 
    }else{
      $(".fill2").css("transform", "rotate("+ ((setpoint - min_setpoint) * step_degrees + 20) +"deg)").css("transition-delay", "0s");
    }
}
