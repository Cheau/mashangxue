import React from 'react'
import {
  GiHearts,
  GiJellyBeans,
  GiKidneys,
  GiLiver,
  GiLungs,
  GiSoundOff,
} from 'react-icons/gi'

export const order = [
    'heart', 'spleen', 'kidney', 'lung', 'liver', 'off',
]

export const profiles = {
  heart: {
    effect: '舒心',
    files: ['紫竹调(古筝).mp3'],
    icon: <GiHearts />,
    part: '入睡',
  },
  spleen: {
    effect: '健脾',
    files: ['春江花月夜.mp3', '月儿高(古筝).mp3'],
    icon: <GiJellyBeans />,
    part: '用餐',
  },
  kidney: {
    effect: '补肾',
    files: ['梅花三弄(古琴).mp3'],
    icon: <GiKidneys />,
    max: 11,
    min: 7,
  },
  lung: {
    effect: '润肺',
    files: ['阳春白雪(琵琶).mp3'],
    icon: <GiLungs />,
    max: 19,
    min: 15,
  },
  liver: {
    effect: '养肝',
    files: ['胡笳十八拍.mp3'],
    icon: <GiLiver />,
    max: 23,
    min: 19,
  },
  off: {
    effect: '休息一下',
    files: [],
    icon: <GiSoundOff />,
  },
}

export const ranges = {
  heart: [['13:00', '14:00'], ['22:00', '23:00']],
  spleen: [['07:00', '09:00'], ['11:00', '13:00'], ['17:00', '19:00']],
  kidney: [['07:00', '11:00']],
  lung: [['15:00', '19:00']],
  liver: [['19:00', '23:00']],
  off: ['还没到点'],
}

export default {
  order,
  profiles,
  ranges,
}
