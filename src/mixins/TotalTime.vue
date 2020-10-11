<script>
import moment from "moment";

export default {
    name: "TotalTime",
    methods: {
        decimalTime(start, end, has_break=false) {
            const time_end = moment(end, 'HH:mm:ss');
            const time_start = moment(start, 'HH:mm:ss');

            const minutes = moment(time_end).diff(time_start, 'minutes');

            if (has_break) {
                return moment.duration(minutes, 'seconds').asMinutes() - .5;
            } else {
                return moment.duration(minutes, 'seconds').asMinutes();
            }
        },
        minTommss(minutes) {
            const sign = minutes < 0 ? "-" : "";

            const min = Math.floor(Math.abs(minutes));

            const sec = Math.floor((Math.abs(minutes) * 60) % 60);

            return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
        },
        totalTime(start, end, has_break=false) {
            const total = this.decimalTime(start, end, has_break)

            return this.minTommss(total);
        }
    }
}
</script>