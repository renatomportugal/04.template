// Locally Registered Component
const ProfileAvatar = {
  props: {
    avatar: {
      default: () => {},
      type: Object },

    customClass: {
      default: '',
      type: String },

    size: {
      default: '60px',
      type: String } },


  template: `
    <v-avatar :class="(customClass) ? customClass : ''" :color="(!avatar.src) ? GetColour(avatar.alt) : null" :size="size">
      <slot></slot>
      <img
        v-if="avatar.src"
        :src="avatar.src"
        :alt="avatar.alt"
      >
      <span
        v-else
        class="white--text"
      >
        {{ GetInitials(avatar.alt) }}
      </span>
    </v-avatar>
  `,
  methods: {
    GetColour(name) {
      var hash = 0;
      if (name.length === 0) return hash;
      for (var i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
      var color = '#';
      for (var i = 0; i < 3; i++) {
        var value = hash >> i * 8 & 255;
        color += ('00' + value.toString(16)).substr(-2);
      }
      return color;
    },
    GetInitials(name) {
      const parts = name.split(' ');
      let initials = '';
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          initials += parts[i][0];
        }
      }
      return initials;
    } } };



const ProfilePresence = {
  props: {
    presence: {
      default: 'away',
      type: String } },


  computed: {
    presenceColour() {
      switch (this.presence.toLowerCase()) {
        case 'away':
          return 'orange';
        case 'busy':
          return 'red';
        case 'holiday':
          return 'purple';
        case 'offline':
          return 'grey';
        case 'online':
          return 'success';}

    } },

  template: `
    <div class="presence" :class="presenceColour"></div>
  ` };


const ProfileTooltip = {
  props: {
    avatar: {
      default: () => {},
      type: Object },

    presence: {
      default: true,
      type: Boolean } },


  template: `
    <v-layout column>
      <span v-if="presence" class="font-weight-medium text-uppercase">
        <small>{{ avatar.presence }}</small>
      </span>
      <span class="font-weight-medium">{{ avatar.alt }}</span>
      <span>{{ avatar.role }}</span>
    </v-layout>
  ` };


new Vue({
  el: '#app',
  components: {
    ProfileAvatar,
    ProfilePresence,
    ProfileTooltip },

  data() {
    return {
      avatars: [
      {
        alt: 'John Smitt',
        id: 1,
        presence: 'Online',
        role: 'Frontend Engineer',
        src: null },

      {
        alt: 'Joanne Swizzlette',
        id: 2,
        presence: 'Away',
        role: 'Automation Engineer',
        src: 'https://randomuser.me/api/portraits/med/women/3.jpg' },

      {
        alt: 'Frankie Dowle',
        id: 4,
        presence: 'Online',
        role: 'Platform Architect',
        src: 'https://randomuser.me/api/portraits/med/men/8.jpg' },

      {
        alt: 'Annette Walker',
        id: 5,
        presence: 'Online',
        role: 'Head of UX',
        src: 'https://randomuser.me/api/portraits/med/women/5.jpg' },

      {
        alt: 'Danny Quaide',
        id: 6,
        presence: 'Offline',
        role: 'UI Designer',
        src: 'https://randomuser.me/api/portraits/med/men/10.jpg' },

      {
        alt: 'Paisley Arch',
        id: 7,
        presence: 'Holiday',
        role: 'Automation Engineer',
        src: 'https://randomuser.me/api/portraits/med/women/7.jpg' },

      {
        alt: 'Kenneth Boomstang',
        id: 8,
        presence: 'Online',
        role: 'Frontend Engineer',
        src: 'https://randomuser.me/api/portraits/med/men/1.jpg' },

      {
        alt: 'Donna Avery',
        id: 9,
        presence: 'Online',
        role: 'UX Researcher',
        src: 'https://randomuser.me/api/portraits/med/women/2.jpg' },

      {
        alt: 'Phillip Hargreaves',
        id: 10,
        presence: 'Online',
        role: 'Head of Quality',
        src: 'https://randomuser.me/api/portraits/med/men/11.jpg' },

      {
        alt: 'Melissa Tushoos',
        id: 11,
        presence: 'Online',
        role: 'Head of Platform Engineering',
        src: 'https://randomuser.me/api/portraits/med/women/4.jpg' },

      {
        alt: 'Justin Backbeard',
        id: 12,
        presence: 'Busy',
        role: 'Frontend Engineer',
        src: 'https://randomuser.me/api/portraits/med/men/13.jpg' },

      {
        alt: 'Amy Fullerton',
        id: 13,
        presence: 'Busy',
        role: 'UI Designer',
        src: 'https://randomuser.me/api/portraits/med/women/6.jpg' },

      {
        alt: 'Angus Dougherty',
        id: 14,
        presence: 'Online',
        role: 'Backend Engineer',
        src: null },

      {
        alt: 'Jess Cransley',
        id: 15,
        presence: 'Online',
        role: 'UX Advocate',
        src: 'https://randomuser.me/api/portraits/med/women/8.jpg' },

      {
        alt: 'Barry Morgan',
        id: 16,
        presence: 'Away',
        role: 'Frontend Architect',
        src: 'https://randomuser.me/api/portraits/med/men/17.jpg' },

      {
        alt: 'Warren Deekead',
        id: 17,
        presence: 'Online',
        role: 'Backend Engineer',
        src: 'https://randomuser.me/api/portraits/med/men/19.jpg' },

      {
        alt: 'Melissa Warmslent',
        id: 18,
        presence: 'Holiday',
        role: 'DevOps Engineer',
        src: 'https://randomuser.me/api/portraits/med/women/12.jpg' }],


      darkMode: true,
      menuMaxHeight: `${60 * 5 + 4}px`,
      presence: false,
      stackedLimit: 6,
      stackedMenu: false };

  },

  computed: {
    avatarsSorted() {
      return this.avatars && this.avatars.length > 0 ?
      this.avatars.sort((a, b) => a.alt.localeCompare(b.alt)) :
      null;
    },
    avatarsStackedLimited() {
      return this.avatarsSorted && this.avatarsSorted.length > 0 ?
      this.avatarsSorted.slice(0, this.stackedLimit) :
      null;
    } },


  created() {
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && this.DarkModeToggle());
    window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && this.DarkModeToggle());
  },

  beforeDestroy() {
    window.matchMedia("(prefers-color-scheme: dark)").removeListener();
    window.matchMedia("(prefers-color-scheme: light)").removeListener();
  },

  methods: {
    DarkModeToggle() {
      this.darkMode = !this.darkMode;
    },
    GetColour(name) {
      var hash = 0;
      if (name.length === 0) return hash;
      for (var i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
      var color = '#';
      for (var i = 0; i < 3; i++) {
        var value = hash >> i * 8 & 255;
        color += ('00' + value.toString(16)).substr(-2);
      }
      return color;
    } } });