<template>
  <view class="company-attest d-flex justify-content-center align-item-center tc-body pt-6 mb-4 text-center">
    <span class="company-adornment"></span>
    <slot>
<!--      <span class="mx-2">完成以下认证即可申请开店</span>-->
    </slot>
    <text class="company-adornment adornment-right"></text>
  </view>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" >
  @import "../common/css/user/base.scss";
  // .company-attest{
  //   .company-adornment{
  //     position:relative;
  //     display:inline-block;
  //     width:pxToRem(130);
  //     border-bottom:1px solid $lightGray;
  //     &:after{
  //       content:"";
  //       position:absolute;
  //       top:50%;
  //       right:0;
  //       transform: translateY(-50%);
  //       width:pxToRem(15);
  //       height:pxToRem(15);
  //       background:$lightGray;
  //       border-radius:pxToRem(100)
  //     }
  //     &.adornment-right:after{
  //       left:0;
  //     }
  //   }
  // }
</style>
