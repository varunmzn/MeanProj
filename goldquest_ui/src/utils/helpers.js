import metalsData from "@/data/metals.json";
import dataResource from "@/utils/resources";
import moment from "moment";
export default {
    dateString(value, format = "ll") {
        if (isNaN(value))
            return moment(value).utc().format(format);
        else
            return moment(value * 1000).format(format);
    },
    getAllOptions() {
        let metals = metalsData;
        let options = [];
        metals.forEach(metal => {
            options = options.concat(metal.options);
        });
        return options;
    },
    getMetal(metal_id, prop) {
        let metal = _.find(metalsData, function (m) {
            return m.id == metal_id;
        });
        return !prop ? metal.name : metal;
    },
    getPurity(purity_id) {
        let options = this.getAllOptions();
        let purity = _.find(options, function (o) {
            return o.id == purity_id;
        });
        return purity.name;
    },
    getSpot() {
        return dataResource.API.get("/metals/spot")
          .then(response => {
            return response.data.payload;
          })
          .catch(errorResponse => {
            // Handle error...
            console.log("API responded with:", errorResponse);
          });
      }
}
