<template>
  <div>
    <div class="above-header">
      <div class="container">
        <div class="left-side">
          <span class="email">contact@mdstats.eu &nbsp; &nbsp; |&nbsp; &nbsp; +421 906 666 666</span>
        </div>
        <div class="right-side"></div>
      </div>
    </div>
    <div class="navbar-component">
      <div class="navbar area">
        <router-link to="/" class="brand">
          <img src="./../assets/logo.png" alt="mdStats" />
        </router-link>
        <nav role="navigation" id="navigation" class="list" :class="{ on: this.toggleActive }" ref="navList">
          <router-link to="/stats" class="item link">Stats</router-link>
          <router-link to="/about" class="item link">About Us</router-link>
        </nav>
        <button data-collapse data-target="#navigation" ref="toggleBtn" class="toggle" :class="{ active: this.toggleActive }"
          @click="toggleClicked">
          <span class="icon"></span>
        </button>
      </div>
    </div>
    <div class="below-header"></div>
  </div>
</template>

<script>
  export default {
    name: "stHeader",
    data() {
      return {
        toggleActive: false
      }
    },
    methods: {
      toggleClicked() {
        this.toggleActive = !this.toggleActive;
      }
    }
  }
</script>

<style lang="scss" scoped>
.above-header {
    background-color: #f6f6f6;
    border-bottom: .0625rem solid rgba(0, 0, 0, .1);
    color: #9e9e9e;
    font-size: .75rem;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > .left-side > .email {
        color: #9e9e9e;
        display: inline-block;
        font-size: 11px;
        font-family: "Roboto", sans-serif;
      }
    }
}

.below-header {
  height: 35px;
}
  .area {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
      width: 750px;
    }

    @media (min-width: 992px) {
      width: 970px;
    }

    @media (min-width: 1200px) {
      width: 1140px;
    }
  }

  // Component skeleton
  .navbar-component {
    background-color: $navbar-background;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
    font-family: "Roboto", sans-serif;

    &>.navbar {
      justify-content: space-between;
    }
  }

  // Component
  .navbar {

    // Brand
    &>.brand {
      display: flex;
      justify-content: center;
      margin-top: auto;
      margin-bottom: auto;
      font-size: 16px;
      color: #777;
      // margin: round(($navbar-height - 20) / 2);
    }

    // Toggle button
    &>.toggle {
      border: 0;
      background-color: transparent;
      outline: none;
      border: 0;
      display: inline-block;
      background-color: transparent;
      background-image: none;
      vertical-align: middle;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;
      touch-action: manipulation;
      user-select: none;
      padding: round(($navbar-height - 20) / 2);

      @media (min-width: $navbar-collapse-breakpoint) {
        display: none;
      }
    }

    &>.toggle>.icon {
      position: relative;
      margin-top: 8px;
      margin-bottom: 8px;

      &,
      &:before,
      &:after {
        display: block;
        width: 24px;
        height: 3px;
        transition: background-color 0.3s linear, transform 0.3s linear;
        background-color: #555555;
      }

      &:before,
      &:after {
        position: absolute;
        content: "";
      }

      &:before {
        top: -8px;
      }

      &:after {
        top: 8px;
      }
    }

    &>.toggle.-active>.icon {
      background-color: transparent;

      &:before {
        transform: translateY(8px) rotate(45deg);
      }

      &:after {
        transform: translateY(-8px) rotate(-45deg);
      }
    }

    // List of items
    &>.list {
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      transition: visibility 0.3s linear, opacity 0.3s linear;

      @media (min-width: $navbar-collapse-breakpoint) {
        display: flex;
        opacity: 1;
        visibility: visible;
      }

      @media (max-width: $navbar-collapse-breakpoint) {
        visibility: hidden;
        opacity: 0;
        position: fixed;
        top: $navbar-height;
        left: 0;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        border-top: 1px solid $navbar-border;
        background-color: $navbar-background;
      }

      &.on {
        display: flex;
        visibility: visible;
        opacity: 1;
      }
    }

    &>.list>.item {
      flex-shrink: 0;
      height: $navbar-height;
      line-height: $navbar-height;
      padding-left: round(($navbar-height - 20) / 2);
      padding-right: round(($navbar-height - 20) / 2);
      text-transform: uppercase;
      color: $navbar-item-color;
      font-size: $navbar-item-font-size;
    }

    &>.list>.item.link {
      line-height: $navbar-height + $navbar-item-border-width;
      color: $navbar-item-color;
      border-bottom: $navbar-item-border-width solid $navbar-item-border;

      &.router-link-exact-active,
      &:hover,
      &:focus {
        color: $navbar-item-active-color;
        border-bottom-color: $navbar-item-active-border;
      }
    }
  }
</style>