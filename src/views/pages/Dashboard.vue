<template>
  <div>
    <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>

      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
        @click:date="viewDay"
        @click:more="viewDay"
        @click:event="showEvent"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day", "4day"],
    // mode: 'stack',
    // modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Napoleon Patague",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEvents() {
      const events = [];

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
          const eventsX = response.data.data.employees;

          for (var i = 0; i < eventsX.length; i++) {
            console.log(eventsX[i].schedules);
            let name = eventsX[i].fullName;
            //let title=eventsX[i].fullName;
            let sched = eventsX[i].schedules;
            //let filterSched=eventsX[i].schedules.filter((e)=>e.shiftCode !== null );

            for (var z = 0; z < sched.length; z++) {
              if (sched[z].shiftCode === null) {
                const start = moment(sched[z].scheduleDateLabel).format(
                  "YYYY-MM-DD"
                );

                const end = moment(sched[z].scheduleDateLabel).format(
                  "YYYY-MM-DD"
                );

                this.events.push({
                  name: name,
                  start: start,
                  end: end,
                  color: this.colors[this.rnd(0, this.colors.length - 1)],
                });
              }
            }
          }
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });

      this.events = events;
      console.log("TEST" + this.events);
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
