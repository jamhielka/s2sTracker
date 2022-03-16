<template>
  <div class="admin-schedule">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee._id">
            <td>{{ employee.fullName }}</td>
            <td
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
  </div>
</template>

<script>
export default {
  data: () => ({
    employees: [],
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
  },
};
</script>
