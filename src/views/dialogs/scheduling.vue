<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Set Schedule</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="scheduleItem.shiftId"
                  :items="listShift"
                  item-text="name"
                  item-value="_id"
                  label="Enter your  Status"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-label for="govPagIbig">Date</v-label>
                <v-menu
                  v-model="modalScheduleDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="scheduleItem.date"
                      label="Enter your Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="scheduleItem.date"
                    @input="modalScheduleDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="SchedItemConfirm()"
            >OK</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import moment from "moment";

export default {
  data: () => ({
    listShift: [],
    scheduleItem: {
      employeeId: 0,
      shiftId: 0,
      date: "",
    },
    defaultItem: {
      name: "",
      code: "",
    },
    modalScheduleDate: false,
  }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      console.log(this.$props.data);
      //   this.Rdata.preferenceNo = this.$props.data.referenceNumber;
      //   console.log(this.Rdata);
      //   this.IData = this.$props.data;
      //   axios
      //     .post("http://161.49.63.45:8087/api/Ibas/PhotoWeb", this.Rdata, {
      //       //headers: {
      //       // Authorization: `Bearer ${this.authToken}`,
      //       // Accept: "application/json",
      //       //},
      //     })
      //     .then((res) => {
      //       this.desserts = res.data.photoType;
      //       this.loadTable = false;
      //       console.log(this.res);
      //     });
      //this.loadPhoto();
    },
  },



  methods: {
  

    loadShift() {
      var TToken = localStorage.getItem("token");
      console.log(TToken);
      this.$api
        .get("/admin/shift", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          console.log(response);
          this.listShift = response.data.data.shifts;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },

    close() {
      this.$emit("close", false);
    },
  },
};
</script>