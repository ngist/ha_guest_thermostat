// Copyright (c) 2025 Nat Gist
// See license information contained in LICENSE file in project repository
// at https://github.com/ngist/ha_guest_thermostat/

//   Fetch query string parameters
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const room = urlParams.get('room');
const webhook_id = urlParams.get('hook_id');

var current_temp = 70;
var setpoint = 70;
var heatpump_status = {};
var boiler_status = {};

document.getElementById("heading").innerHTML = friendly_name_map[room];

var entities = entity_map[room]

function fetch_data(my_entity, callback) {
   fetchEntityState(my_entity, token)
      .then(data => {
        if (debug) { console.log("Data received:", data); }
        callback(data);
      })
      .catch(error => {
        console.error("Failed to retrieve data:", error);
      });
}

function update_temp() {
    fetch_data(entities.temperature_entity, function(data){
        current_temp = data.state;
        document.getElementById("current_temp").innerHTML = current_temp;
        $(".ctemp").css("transform", "translate(-50%, -50%) rotate("+ ((current_temp-midpoint_temp) * step_degrees)+"deg)");
        $(".ctemp").css("animation", "none");
    })
}

function update_setpoint() {
    fetch_data(entities.setpoint_entity, function(data){
        last_setpoint = setpoint
        setpoint = Math.round(data.state);
        document.getElementById("setpoint").innerHTML = setpoint;
        updateGr();
        if (last_setpoint > setpoint){
            decrease_setpoint_animation()
        } else if (last_setpoint < setpoint){
            increase_setpoint_animation()
        }
    })
}

function fetch_heatpump_status() {
    fetch_data(entities.heatpump_entity, function(data){
        heatpump_status.state = data.state;
        heatpump_status.hvac_action = data.attributes.hvac_action;
        heatpump_status.fan_mode = data.attributes.fan_mode;
        heatpump_status.swing_mode = data.attributes.swing_mode;
    })
}
        
    
function fetch_boiler_status() {
    fetch_data(entities.heatpump_entity, function(data){
        boiler_status.state = data.state;
        boiler_status.hvac_action = data.attributes.hvac_action
    })
}

function set_state() {
    var state = "";
    if (boiler_status.hvac_action == heatpump_status.hvac_action || boiler_status.hvac_action == "off") {
        state = heatpump_status.hvac_action;
    } else if (boiler_status.hvac_action == "heat" || heatpump_status.hvac_action == "heat") {
        state = "heat";
    } else {
        console.error("Unexpected state difference between heatpump and boiler.");
    }
    document.getElementById("state").innerHTML = state;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const update_state = async () => {
    update_temp();
    update_setpoint();
    fetch_heatpump_status();
    fetch_boiler_status();
    // Since data from both heatpump and boiler are needed before we can set the state we need to wait for those queries to finish. There's probalby a better way to do this.
    await delay(250);
    set_state();
}

function increase_setpoint(){
  if(setpoint < max_setpoint){
    setpoint++;
    triggerWebhook(webhook_id, {room: room, temp_setpoint: setpoint})
    increase_setpoint_animation();
  }  
}

function decrease_setpoint(){ 
  if(setpoint > min_setpoint){
    setpoint--;
    triggerWebhook(webhook_id, {room: room, temp_setpoint: setpoint})
    decrease_setpoint_animation();
  }
}

