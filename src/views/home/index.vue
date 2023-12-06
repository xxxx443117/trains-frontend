<template>
  <div class="home">
    <div class="home-box">
      <div class="heard-img">
        <img src="@/assets//images/home/Trains-logo.png" alt="" />
      </div>
      <div class="font-size-t">AI{{ t("Technology_driven") }}Web3{{ t("Investment") }}</div>

      <div class="cerar-v">
        <div class="profit">
          <p>10+{{ t("Billion") }}USDT</p>
          <div>{{ t("Total_user_profit") }}</div>
        </div>

        <div class="invest-now">
          <van-button class="my-btn" @click="$router.push('/funding')">{{
            t("Immediate_investment")
          }}</van-button>
        </div>
        <div class="libe"></div>
      </div>
    </div>

    <div class="cooperative">
      <div class="cooperative-title">{{ t("Cooperative_Exchange") }}</div>
      <div class="cooperative-img">
        <img src="@/assets//images/home/Binance-coin-bnb-logo.png" alt="" />
        <img src="@/assets//images/home/coinbase-logo.png" alt="" />
        <img src="@/assets//images/home/Kraken-Symbol.png" alt="" />
        <img src="@/assets//images/home/kucoin-logo.png" alt="" />
        <img src="@/assets//images/home/OKX.png" alt="" />
        <img src="@/assets//images/home/huobi.png" alt="" />
      </div>

      <div class="cooperative-title">{{ t("Real_time_transactions") }}</div>
      <div class="real-time">
        <div>{{ t("Source_Exchange") }}</div>
        <div>{{ t("Robots") }}</div>
        <div>{{ t("Transaction_pairs") }}</div>
        <div>{{ t("Profit_and_loss") }}(USDT)</div>
      </div>

      <div style="height: 300px;">


        <Vue3Marquee :vertical="true" :duration="600">
          <div class="real-time1" v-for="(item, index) in list" :key="index">
            <div class="real-two">
              <img :src="item.image" alt="" />
              {{ item.name }}
            </div>
            <div>{{ item.people }}</div>
            <div>{{ item.pairs }}</div>
            <div v-if="item.Loss.indexOf('+')" class="color-v">{{ item.Loss }}</div>
            <div v-else class="color-c">{{ item.Loss }}</div>
          </div>
        </Vue3Marquee>

      </div>
    </div>

    <div class="advantage-box">
      <div class="advantage-title">{{ t("We_quantify_the_advantages_in_transactions") }}</div>
      <div class="advantage-txt">
        {{ t("We_have_years_of_accumulated_technology_in_artificial_intelligence") }}LLM ({{
          t("Big_Language_Model")
        }}）：TAI
      </div>

      <div>
        <div class="finance-box">
          <div class="finance-left"><img src="@/assets/images/home/data.png" alt="" /></div>

          <div class="finance-right">
            <div class="finance-title">TAI{{ t("Advantages") }}1</div>
          </div>
        </div>

        <div class="finance-txt">
          {{ t("Able_to_understand_and_explain_the_nature_of_a_large_number_of_financial_fields") }}
          {{ t("Language_data") }}，{{ t("Including_news") }}、{{ t("Social_media_comments") }}、
          {{ t("Financial_reports,_etc") }}。
        </div>
      </div>

      <div>
        <div class="finance-box">
          <div class="finance-left"><img src="@/assets/images/home/customer.png" alt="" /></div>

          <div class="finance-right">
            <div class="finance-title">TAI{{ t("Advantages") }}2</div>
          </div>
        </div>

        <div class="finance-txt">
          {{ t("Able_to_perceive_and_understand_the_emotions_of_market_trading_participants") }}
          {{ t("And_the_state_of_mind") }}，{{
            t("And_incorporate_these_factors_into_the_transaction")
          }}
          {{ t("In_decision-making") }}。
        </div>
      </div>

      <div>
        <div class="finance-box">
          <div class="finance-left"><img src="@/assets/images/home/Dynamics.png" alt="" /></div>

          <div class="finance-right">
            <div class="finance-title">TAI{{ t("Advantages") }}3</div>
          </div>
        </div>

        <div class="finance-txt">
          {{
            t(
              "Artificial_intelligence_integrates_a_large_amount_of_market_information_and_intelligence"
            )
          }}
          {{ t("Combining") }}，{{
            t("And_combine_the_emotions_of_market_participants_to_generate_intelligence")
          }}
          {{ t("Ability_to_engage_in_rational_trading_strategies_and_generate_profits") }}。
        </div>
      </div>
    </div>

    <div class="route-box">
      <div class="route-title">{{ t("Roadmap") }}</div>

      <div class="flex-box-b">
        <div class="left">
          <div>2016</div>
          <div>2021</div>
          <div>2023.05</div>
          <div>2023.08</div>
          <div>2023.10</div>
          <div>2024.01</div>
          <div>2024.03</div>
          <div>2024.07</div>
        </div>

        <div class="right">
          <van-steps direction="vertical" :active="10" active-icon="location-o" inactive-icon="location-o"
            finish-icon="location-o" active-color="#ffffff" inactive-color="#ffffff">
            <van-step>
              <div class="triangle-b">
                <div class="triangle"></div>
                <div class="square">{{ t("Team_establishment") }}</div>
              </div>
              <p class="p1">.{{ t("Research_on_neural_networks") }}</p>
            </van-step>
            <van-step>
              <div class="triangle-b">
                <div class="triangle"></div>
                <div class="square">LLM{{ t("Technological_breakthroughs") }}</div>
              </div>
              <p class="p1">
                .{{ t("The_company's_big_language_achieves_technological_breakthroughs") }}
              </p>
            </van-step>
            <van-step>
              <div class="triangle-b">
                <div class="triangle"></div>
                <div class="square">{{ t("Start") }}SAAS{{ t("Investment_Services") }}</div>
              </div>

              <p class="p1">.{{ t("Open_to_the_public") }}Trains.VIP</p>
            </van-step>
            <van-step>
              <div class="triangle-b">
                <div class="triangle"></div>
                <div class="square">{{ t("Genesis_Issue") }}</div>
              </div>

              <p class="p1">
                .{{ t("Issuance_of_Genesis") }}NFT,{{ t("Open") }}WEB3 {{ t("Governance") }}.VIP
              </p>
            </van-step>
            <van-step>
              <div class="triangle-c">
                <div class="triangle"></div>
                <div class="square">{{ t("Go_Live") }}XChat</div>
              </div>

              <p class="p1">.{{ t("Simultaneously_open_source") }}Trains.VIP{{ t("And") }} XChat</p>
            </van-step>
            <van-step>
              <div class="triangle-c">
                <div class="triangle"></div>
                <div class="square">{{ t("Publish") }}TrainsMaker</div>
              </div>

              <p class="p1">
                .{{ t("Provide_better_services_for_institutions") }}AI{{ t("Quantification") }}
                {{ t("Services") }}
              </p>
            </van-step>
            <van-step>
              <div class="triangle-c">
                <div class="triangle"></div>
                <div class="square">{{ t("Publish") }}XHub</div>
              </div>

              <p class="p1">
                .{{ t("Complete") }}AI{{ t("The_last_link_of_the_transaction") }}，
                {{ t("Connect_assets_on_the_chain") }}
              </p>
            </van-step>
            <van-step>
              <div class="triangle-c">
                <div class="triangle"></div>
                <div class="square">{{ t("Implement_decentralized_governance") }}</div>
              </div>

              <p class="p1">
                .TRT{{ t("Ecological_breakthrough") }}100{{ t("100_million_US_dollars") }}
              </p>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>

    <div class="footer">
      <div><img src="@/assets/images/home/login.png" alt="" class="footer-img" /></div>
      <div style="margin: 20px 0 0 0">
        Trains{{ t("It_is_a_company_registered_in_Cayman") }}、{{
          t("Using_artificial_intelligence_technology")
        }}
        {{ t("Technology_companies_engaged_in_quantitative_trading") }}。
      </div>
      <div style="margin: 20px 0 50px 0">
        2016{{ t("Year") }}，{{ t("Artificial_intelligence") }}AlphaGO{{
          t("In_ancient_Go_competitions")
        }}
        {{ t("With") }}4:1{{
          t("Defeated_the_World_Masters_Champion_with_high_scores_in_the_same_year")
        }}，Trains {{ t("Establishment_of_the_company") }}，{{
  t("Intended_to_use_the_latest_artificial_intelligence_technology_in_finance")
}}
        {{ t("Defeating_world-class_traders_and_trading_teams_in_quantitative_trading") }}。
      </div>
      <div style="font-size: 12px">
        {{ t("If_you_have_any_questions,_please_contact") }} support@Trains.com
        {{ t("Contact_Us") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { list } from "./list.js"
const { t } = useI18n();
const router = useRouter();
const investNow = () => {
  router.push("/home/investNow");
};
</script>

<style scoped lang="less">
.home {
  // height: 3000px;
  background: #00797b;
  padding-bottom: 100px;

  .home-box {
    width: 100%;
    height: 293px;
    position: relative;
    z-index: 0;
  }

  .home-box::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url("@/assets/images/home/home-bg.png") no-repeat center / contain;
    z-index: 0;
    opacity: 0.9;
  }

  .heard-img {
    padding: 20px 0 20px 20px;

    img {
      width: 114px;
      height: 28px;
    }
  }

  .font-size-t {
    font-size: 20px;
    padding: 0px 0 20px 20px;
  }

  .cerar-v {
    background-color: rgba(0, 121, 123);

    .profit {
      margin-top: 30px;
      width: 280px;
      height: 200px;
      border: 3px solid #ffffff;
      border-radius: 7px;
      margin: 70px auto auto auto;
      text-align: center;

      p {
        font-weight: bold;
        color: #ffffff;
        font-size: 37px;
      }

      div {
        color: #ffffff;
        font-size: 27px;
      }
    }
  }

  .invest-now {
    width: 218px;
    height: 60px;
    margin: 30px auto auto auto;

    .my-btn {
      width: 218px;
      height: 60px;
      font-size: 24px;
    }
  }

  .libe {
    width: 100%;
    height: 30px;
  }

  .cooperative {
    color: #ffffff;
    margin: 200px auto auto auto;
    padding: 20px;
    background: #01888a;

    .cooperative-title {
      font-size: 20px;
      margin: 20px auto 20px auto;
    }

    .cooperative-img {
      display: flex;
      justify-content: space-between;
      margin: 0px auto 40px auto;
      align-items: center;
      flex: 1;

      img {
        width: 40px;
        height: 40px;
      }
    }

    .real-time {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 30px;

      div {
        line-height: 40px;

        img {
          vertical-align: sub;
          width: 20px;
          height: 20px;
        }

        flex: 1;
        text-align: center;
      }
    }

    .real-time1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 350px;


      .real-two {
        display: flex;
        align-items: center;
        // justify-content: center;
        text-align: left;
      }

      div {
        line-height: 40px;
        height: 40px;
        // text-align: left;
        // background: red;

        img {
          vertical-align: sub;
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        flex: 1;
        text-align: center;
      }
    }
  }

  .advantage-box {
    padding: 20px;

    .advantage-title {
      font-size: 24px;
    }

    .advantage-txt {
      font-size: 16px;
      padding-top: 10px;
    }

    .finance-box {
      display: flex;
      justify-content: left;
      align-items: center;
      padding-top: 40px;

      .finance-left {
        width: 53px;
        height: 53px;
        background: #b4c734;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 21px;
          height: 20px;
        }
      }

      .finance-right {
        .finance-title {
          font-weight: bold;
          color: #ffffff;
          font-size: 18px;
          background: url("@/assets/images/home/jux.png") no-repeat;
          background-size: 100% 100%;
          width: 128px;
          height: 29px;
          margin-left: 10px;
          text-align: center;
          line-height: 30px;
        }
      }
    }

    .finance-txt {
      font-size: 16px;
      padding-left: 73px;
    }
  }

  .route-box {
    padding: 20px;
    background: #01888a;

    .route-title {
      font-size: 24px;
    }

    .flex-box-b {
      display: flex;
      // justify-content: left;
      // align-items: center;
      padding-top: 40px;

      .left {
        font-size: 16px;
        margin-top: -30px;
        line-height: 95px;
      }

      .right {
        padding-left: 10px;
      }
    }
  }
}

.footer {
  padding: 20px;
  text-align: center;
  font-size: 16px;

  .footer-img {
    width: 66px;
    height: 55px;
  }
}

.title-vant-s {
  background: url("@/assets/images/home/yuan.png") no-repeat;
  background-size: 100% 100%;
  width: 117px;
  height: 27px;
  text-align: center;
  line-height: 28px;
  padding: 0 10px;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
}

.title-vant-s1 {
  background: url("@/assets/images/home/yuan.png") no-repeat;
  background-size: 100% 100%;
  width: 180px;
  height: 27px;
  text-align: center;
  line-height: 28px;
  font-weight: bold;
  padding: 0 10px;
  font-size: 16px;
  margin-left: 20px;
}

.title-vant-v {
  background: url("@/assets/images/home/yuan2.png") no-repeat;
  background-size: 100% 100%;
  width: 150px;
  height: 27px;
  text-align: center;
  line-height: 28px;
  padding: 0 10px;
  color: #00797b;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
}

.p1 {
  margin-left: 20px;
}

/deep/.van-steps {
  background: #01888a;
  border: none;
}

/deep/[class*="van-hairline"]:after {
  border: 0 solid transparent;
}

/deep/.van-badge__wrapper {
  background: #01888a;
  padding: 5px 0;
}

.triangle-b {
  display: flex;
  justify-content: left;
  align-items: center;

  .triangle {
    width: 0;
    height: 0;
    border: 14px solid;
    border-color: transparent #b4c734 transparent transparent;
  }

  .square {
    padding: 0 5px;
    height: 27px;
    background: #b4c734;
    line-height: 28px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-weight: bold;
    font-size: 14px;
  }
}

.triangle-c {
  display: flex;
  justify-content: left;
  align-items: center;

  .triangle {
    width: 0;
    height: 0;
    border: 14px solid;
    border-color: transparent #ffffff transparent transparent;
  }

  .square {
    color: #00797b;
    padding: 0 5px;
    height: 27px;
    background: #ffffff;
    line-height: 28px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-weight: bold;
    font-size: 14px;
  }
}

.color-v {
  color: #FF3131;
}

.color-c {
  color: #78F1AB;
}
</style>
