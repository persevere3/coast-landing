<template>
  <div class="onboarding-root" :class="rootClass">
    <img class="bg" :src="bgSrc" :style="{ width: bgWidth + 'px', height: bgHeight + 'px'}">
    <div class="overlay" :style="{ width: bgWidth + 'px', height: '100%' }">
      <header class="header">
        <img src="/src/assets/logo.png" class="logo" />
        <h1>海岸在线</h1>
      </header>

      <div class="divider"></div>

      <div class="buttons">
        <el-button type="primary" class="link" v-for="item in links" :key="item.label" @click="goToLink(item.link)" :disabled="!item.link">
          <el-icon v-if="item.icon"><Component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import itemApi from '@/api/item'

import { loadExternalScript } from '@/utils/loadExternalScript'

const bgWidth = ref(0)
const bgHeight = ref(0)
const bgSrc = ref('')
const rootClass = ref('')
let prevDpr = 1



const resetBg = () => {
  bgWidth.value = window.innerWidth
  bgHeight.value = window.innerHeight

  if(bgWidth.value <= 768) {
    bgSrc.value = '/img/city-bg-m.png'
    rootClass.value = 'm'
  }
  else {
    bgSrc.value = '/img/city-bg.png'
    rootClass.value = ''
  }
}

const onResize = () => {
  let curDpr = window.devicePixelRatio || 1
  if(bgWidth.value > 480 && curDpr !=  prevDpr) {
    prevDpr = curDpr
    return
  }
  resetBg()
}

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true })
  onResize()
  resetBg()
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})


// ==============================================================================================================
const router = useRouter()

interface ILink {
  label: string,
  icon: string,
  link: string,
}
// 代理后台 Lock 会员 UserFilled 苹果 Download 安卓 Download 在线咨询 Headset
let links = ref<ILink[]>([])

async function getItemList() {
  try {
    let res = await itemApi.getItemList()

    links.value = []
    if(res?.code === 200) {
      for(let key in res.data) {
        const k = key as keyof typeof res.data
        let item = res.data[k]

        let label = ''
        let icon = ''

        if(key === 'Agent') {
          icon = 'Lock'
          label = '代理后台登录'
        }
        else if(key === 'Client') {
          icon = 'UserFilled'
          label = '会员登录'
        }
        else if(key === 'Android') {
          icon = 'Download'
          label = '安卓下载'
        }
        else if(key === 'IOS') {
          icon = 'Download'
          label = '苹果下载'
        }

        links.value.push({
          label,
          icon,
          link: item,
        })
      }

      let link = ''
      try {
        await loadExternalScript('https://www.hei111.com/cs_data.js')
        let cs_data = (window as any).cs_data
        link = cs_data[0].Url ?? ''
      } catch (err) {
        console.error('載入失敗:', err)
      }

      links.value.push({
        label: '在线咨询',
        icon: 'Headset',
        link,
      })

    }
    else {
      router.push({name: 'Index'})
    }
  }
  catch (error: any) {
    console.log(error.response)
    router.push({name: 'Index'})
  }
}
getItemList()

function goToLink (link: string) {
  if(!link) return
  window.location.href = link
}
</script>

<style lang="scss" scoped>
.onboarding-root {
  --el-color-primary: #EC9526;
  --el-color-primary-light-3: #f0a84c;
  --el-color-primary-light-5: #f4b272;
  --el-color-primary-light-7: #f8c99b;
  --el-color-primary-light-9: #fde6ca;
  --el-color-primary-dark-2: #c87a1e;

  height: 100%;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: right top;
    z-index: -1;
  }

  .overlay {
    .header {
      width:90%;
      max-width: 900px;
      margin: 20px auto 0 auto;
      display: flex;
      align-items: center;
      
      .logo {
        margin-right: 10px;
      }

      h1 {
        font-size: 20px;
        color: #F5C44D;
      }
    }

    .divider {
      height: 5px; 
      background: #F5C44D; 
      margin: 20px 0;
    }

    .buttons {
      width:90%;
      max-width: 900px;
      margin: 0 auto;
      padding-top: 20px;
      display: flex; 
      justify-content: center; 
      align-items: center;

      .link {
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        border-radius: 100px;
      }
    }
  }

  &.m {
    .bg {
      object-position: center top;
    }

    .overlay {
      position: relative;

      .header {
        margin: 10px auto 0 auto;
        justify-content: center;
        
        .logo {
          width: 120px;
          margin-right: 10px;
        }

        h1 {
          font-size: 18px;
          color: #F5C44D;
        }
      }

      .divider {
        height: 3px; 
        margin: 10px 0;
      }

      .buttons {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        
        flex-direction: column;
        
        .link {
          width: 150px;
          height: 50px;
          line-height: 40px;
          font-size: 14px;
          margin-left: 0;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
