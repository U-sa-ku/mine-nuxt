<template>
  <section
    class="photoSlider"
    v-if="photos.totalCount != 0"
    >
    <h2 class="photoSlider__title">{{ sectionName }}</h2>
    <div class="photoSlider__slider">
      <client-only>
        <swiper
          class="photoSlider__slider"
          :options="swiperOption"
          >
          <swiper-slide
            class="photoSlider__slide"
            v-for="photo in photos.contents"
            :key="photos.contents.id"
            >
            <img
              :data-src="`${photo.photo.url}?dpr=2&w=${imageWidth}&q=80`"
              alt=""
              class="photoSlider__image lazyload lazyloadImage"
              >
            <ElementsImageLoader/>
          </swiper-slide>
          <div
            class="swiper-button-prev"
            slot="button-prev"
            >
          </div>
          <div
            class="swiper-button-next"
            slot="button-next"
            >
          </div>
        </swiper>
      </client-only>
    </div>
    <div class="photoSlider__moreButton">
      <nuxt-link
        :to="`/${sectionName}/`"
        class="photoSlider__moreLink"
        >
        more {{ sectionName }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 1.3,
          spaceBetween: 10,
          centeredSlides: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            768: {
              slidesPerView: 1.265
            },
            1921: {
              slidesPerView: 2.225
            }
          }
        },
        imageWidth: null
      }
    },
    props: {
      sectionName: undefined,
      photos:[]
    },
    mounted() {
      if(window.innerWidth <= 767) {
        this.imageWidth = 494
      } else {
        this.imageWidth = 1125
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photoSlider {
    padding-top: 200px;
    @media (max-width: 999px) {
      padding-top: 100px;
    }
    &__title {
      @include sectionTitle;
    }
    &__slider {
      margin-bottom: 50px;
      @media (max-width: 999px) {
        margin-bottom: 30px;
      }
    }
    &__slide {
      height: 44vw;
      background-color: #000000;
      position: relative;
      @media (max-width: 767px) {
        height: 101.6vw;
      }
      @media (min-width: 1921px) {
        height: 25vw;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      pointer-events: none;
    }
    .swiper-button {
      &-prev:after,
      &-next:after {
        content: "";
        width: 30px;
        height: 30px;
        border-width: 2px 2px 0px 0px;
        border-style: solid;
        border-color: $color_lightGray;
        display: block;
        position: absolute;
        top: 7px;
      }
      &-prev {
        left: 10vw;
        transition: 0.3s;
        transform: scaleY(2);
        @media (max-width: 768px) {
          display: none;
        }
        @media (min-width: 1921px) {
          left: 27vw;
        }
        &:after {
          transform: rotate(-135deg);
        }
      }
      &-next {
        right: 10vw;
        transition: 1s;
        transform: scaleY(2);
        @media (max-width: 768px) {
          display: none;
        }
        @media (min-width: 1921px) {
          right: 27vw;
        }
        &:after {
          transform: rotate(45deg);
        }
      }
      &-disabled {
        opacity: 0;
      }
    }
    &__moreButton {
      text-align: center;
    }
    &__moreLink {
      color: inherit;
      font-family: $fontFamily_english;
      font-size: 2rem;
      letter-spacing: 0.1em;
      text-decoration: none;
      position: relative;
      @media (max-width: 999px) {
        font-size: 1.6rem;
      }
      &:before {
        content: "";
        width: calc(100% + 40px);
        height: 50%;
        border-width: 0px 1.5px 1px 0px;
        border-style: solid;
        border-color: $color_lightGray;
        display: block;
        position: absolute;
        left: 50%;
        bottom: -5px;
        z-index: 0;
        transform: translateX(-50%) skewX(45deg);
        transition: 0.3s;
      }
      @media (min-width: 769px) {
        &:hover:before {
          transform: translateX(calc(-50% + 10px)) skewX(45deg);
        }
      }
    }
    &__noPost {
      font-family: $fontFamily_english;
      font-size: 2.4rem;
      text-align: center;
      letter-spacing: 0.1em;
      margin: 100px 0px;
      @media (max-width: 999px) {
        font-size: 1.8rem;
        margin: 70px 0px;
      }
    }
  }
</style>