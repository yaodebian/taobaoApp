<template>
  <!-- 投保须知 -->
  <div id="freight">
    <mt-header
      class="freight-headBar"
      fixed
      :style="skinSta ? {background: skin.topicColor} : ''"
    >
      <router-link
        :to="path"
        slot="left"
      >
        <mt-button icon="back">投保须知</mt-button>
      </router-link>
    </mt-header>
    <pre class="freight-content">
    一、 投保
    消费者可以自由选择是否需要为其所购的商品投保退货运费险，以购物车形式拍下的每份订单，将作为一个整体仅需投保一次。
    二、 保险期间
    自消费者所购商品所属卖家确认发货时起，至消费者在线点击“确认收货”或交易平台自动“确认收货”时止，以时间先后顺序较早发生者为准。
    三、 保险责任
    在保险期间内，当网络购物行为发生后，因买方收到的实物与网上展示不符或因买卖双方协商一致的其他理由，买方或收货方在买卖双方约定的退货期间内退货，且卖方允许买方或收货方退货并返还货款，保险人按照保险单约定的退货运费进行赔偿。
    四、 责任免除
    有下列情形之一的，保险人不负责赔偿任何损失、费用：
    （一） 投保人、被保险人及其代理人的故意行为、骗保行为；
    （二） 索赔申请者提出理赔申请的时间或退货物流开始的时间早于卖方发货物流结束的时间；
    （三） 就同一物流运单号提出两次及两次以上索赔，保险人对第二次及第二次以上索赔不负任何赔偿责任；
    （四） 索赔申请者提供虚假物流信息；
    （五） 买方换货或拒绝签收卖方邮寄的商品；
    （六） 保险期间终止后发生的退货物流，包括但不限于买方已“确认收货”或买方未在规定时间内发起退货流程的情形；
    （七） 卖方未发货或买方未收到货物或没有发生实际退货物流；
    （八） 买方与卖方未就退货达成一致意见发生的退货行为。
    五、 保险费及支付方式
    1、 保险费的确定
    消费者将以淘宝网交易平台所提供的与其签约的物流公司中，相同路线最低首重价格为每份保单实际保险金额及赔付基准，并根据消费者及相应风险因子费率向消费者收取退货运费险保险费。
    2、保险费支付方式
    消费者应将保费随所购商品同时一次性通过支付宝支付，其中保费进入保险公司支付宝账户。
    六、 理赔与服务
    每份保险合同的理赔金额是根据买家的收货地与退货地间的距离来设定的，保险公司根据淘宝网交易平台所提供的与其签约的物流公司中，相同路线最低首重价格为赔付基准，具体以保单页面显示金额为准。
    支付宝将退货款划入买家支付宝账户后，保险公司开始审核运费险理赔申请，审核时间最迟为72小时。通过审核后理赔款将及时划入买家支付宝账户。如果实际发生的退货运费为第三方垫付，则运费险理赔款将直接赔付给垫付的第三方。
    七、 特别约定
    为了给消费者提供更好的保险服务，退货运费险引入了多家保险公司承保。包括但不限于以下保险公司承保：中国人民财产保险股份有限公司、中国人寿财产保险股份有限公司、华泰财产保险股份有限公司、众安在线财产保险有限公司、太平财产保险有限公司、中国太平洋财产保险股份有限公司、国泰财产保险股份有限公司、泰康在线财产保险股份有限公司。
    </pre>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'freight',
  data () {
    return {
      path: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let path = from.path
      vm.path = path
      if (/^\/?$/.test(path)) {
        vm.path = '/'
      }
    })
  },
  computed: {
    ...mapGetters(['skin', 'skinSta'])
  }
}
</script>
<style>
#freight {
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
  white-space: normal;
}
.freight-headBar {
  background: linear-gradient(to right, #ff9900, #ff2f00);
}
.freight-content {
  font-size: 0.4rem;
  margin-top: 1.2rem;
  white-space: pre-wrap; /*css-3*/
  white-space: -moz-pre-wrap; /*Mozilla,since1999*/
  white-space: -pre-wrap; /*Opera4-6*/
  white-space: -o-pre-wrap; /*Opera7*/
  word-wrap: break-word; /*InternetExplorer5.5+*/
}
</style>

