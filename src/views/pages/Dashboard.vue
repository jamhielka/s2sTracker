<template>
  <div class="admin-schedule">
    <v-simple-table class="SchedTB">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee._id">
            <td>{{ employee.fullName }}</td>
            <td
              @click="SetSchedule()"
              v-for="schedule in employee.schedules"
              :key="schedule.scheduleDate"
            >
              <span v-if="schedule.hasSchedule">{{ schedule.timeLabel }} </span>
            </td>
            <td>{{ employee.summary.workingHours }}</td>
            <td>{{ employee.summary.ot }}</td>
            <td>{{ employee.summary.holiday }}</td>
            <td>{{ employee.summary.leave }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <ScheduleDialog
      :data="scheduledData"
      :dialog="scheduleDialog.dialog"
      @close="scheduleDialog.dialog = !scheduleDialog.dialog"
      @SchedItemConfirm="SchedItemConfirm()"
    ></ScheduleDialog>
  </div>
</template>

<style scoped>
table > tbody > tr > td:nth-child(1),
table > thead > tr > th:nth-child(1) {
  position: sticky !important;
  position: -webkit-sticky !important;
  left: 0;
  z-index: 1;
  background: white;
}
table > thead > tr > th:nth-child(1) {
  z-index: 1;
}
table > tbody > tr > td:nth-child(1) {
  border-right: 1px solid rgb(12, 1, 1);
}
table > thead > tr > th:nth-child(1) {
  border-right: 1px solid rgb(12, 1, 1);
}
</style>

<script>
import axios from "axios";
import ScheduleDialog from "../dialogs/scheduling.vue";
export default {
  components: {
    ScheduleDialog,
  },
  data: () => ({
    employees: [],
    scheduledData: {},
    scheduleDialog: { dialog: false },
  }),
  created() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      //API

      var TToken = localStorage.getItem("token");
      ///console.log(TToken);
      this.$api
        .get("admin/schedule", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          console.log("data", response.data);
          this.employees = response.data.data.employees;
          this.headers = response.data.data.headers;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    SetSchedule(item) {
      this.scheduledData = Object.assign({}, item);

      this.scheduleDialog.dialog = true;
    },
    SchedItemConfirm() {
      var TToken = localStorage.getItem("token");
      console.log("token", TToken);
      //this.scheduleItem.date=moment(this.scheduleItem.date).format("MM-DD-YYYY");
      console.log("log", this.scheduleItem.shiftId);
      console.log("log", this.scheduleItem.date);
      console.log("log", this.scheduleItem.employeeId);
      // this.scheduleItem.employeeId = ;
      // this.desserts.splice(this.editedIndex, 1);

      axios
        .post(
          "http://161.49.63.45:8085/api/admin/schedule",
          this.scheduleItem,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.dialogSchedule = false;
        });

      this.closeSched();
    },
  },
};
</script>
