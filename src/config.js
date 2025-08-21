// Copyright (c) 2025 Nat Gist
// See license information contained in LICENSE file in project repository
// at https://github.com/ngist/ha_guest_thermostat/

// Example config you'll need to change this to match your setup.
const root_endpoint = "https://192.168.1.100:8123/api";  

const climate_mode_entity = "input_select.thermal_mode_selector";

// Modify as needed, you may not need all these entities for your use case.
const entity_map = {
  front_bedroom: {
      temperature_entity: "sensor.filtered_front_bedroom_temperature",
      mode_entity: "input_select.heatpump_group_2_mode",
      setpoint_entity: "input_number.frontbedroom_temp_setpoint",
      heatpump_entity: "climate.front_bedroom_hp_front_bedroom_heatpump",
      boiler_thermostat_entity: "climate.front_bedroom_thermostat"
  },
  rear_bedroom: {
      temperature_entity: "sensor.filtered_rear_bedroom_temperature",
      mode_entity: "input_select.heatpump_group_1_mode",
      setpoint_entity: "input_number.rearbedroom_temp_setpoint",
      heatpump_entity: "climate.rear_bedroom_hp_rear_bedroom_heatpump",
      boiler_thermostat_entity: "climate.rear_bedroom_thermostat"
  },
};
const debug = true;  // If set to true results of API queries will be written to console, error messages will be written to console regardless.

// Max and min allowable setpoints
const min_setpoint = 60;
const max_setpoint = 80;
