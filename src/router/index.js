import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PracticeModeMenu from '../views/Practice/PracticeModeMenu.vue'
import PracticeMode from '../views/Practice/PracticeMode.vue'
import ChallengeModeMenu from '../views/Challenge/ChallengeModeMenu.vue'
import ChallengeGame from '../views/Challenge/ChallengeGame.vue'
import RankingMenu from '../views/Ranking/RankingMenu.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/PracticeModeMenu',
      name: 'PracticeModeMenu',
      component: PracticeModeMenu
    },
    {
      path: '/PracticeMode/:lesson/:v/:n/:adj/:hoka',
      name: 'PracticeMode',
      component: PracticeMode,
      props: true
    },
    {
      path: '/ChallengeModeMenu',
      name: 'ChallengeModeMenu',
      component: ChallengeModeMenu,
    },
    {
      path: '/ChallengeGame/:name/:lesson/:v/:n/:adj/:hoka',
      name: 'ChallengeGame',
      component: ChallengeGame,
      props: true
    },
    {
      path: '/RankingMenu',
      name: 'RankingMenu',
      component: RankingMenu
    },
  ]
})

export default router
