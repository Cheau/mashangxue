import React from 'react'
import {
  GiHearts,
  GiJellyBeans,
  GiKidneys,
  GiLiver,
  GiLungs,
  GiSoundOff,
} from 'react-icons/gi'

const fullPath = (file) => `/audio/e-tcm/${file}`

export const order = [
    'heart', 'spleen', 'kidney', 'lung', 'liver', 'off',
]

export const profiles = {
  heart: {
    effect: '舒心',
    files: ['紫竹调(古筝).mp3'].map(fullPath),
    icon: <GiHearts />,
    part: '入睡',
    intro: `心脏出问题，常出现失眠、心慌、心胸闷等情况，从而导致胸痛、烦躁等表征。
道医最讲究睡子午觉，所以一定要在子时之前就要让心气平和下来。
`
  },
  spleen: {
    effect: '健脾',
    files: ['春江花月夜.mp3', '月儿高(古筝).mp3'].map(fullPath),
    icon: <GiJellyBeans />,
    part: '用餐',
    intro: `长期的暴饮暴食、五味过重、思虑过度等都会让脾胃产生不适，腹胀、便稀、肥胖、口唇溃疡、面黄、月经量少色淡、疲乏、胃或子宫下垂都是常见的症状。
在进餐时，以及餐后一小时内欣赏，效果比较好。
`
  },
  kidney: {
    effect: '补肾',
    files: ['梅花三弄(古琴).mp3'].map(fullPath),
    icon: <GiKidneys />,
    max: 11,
    min: 7,
    intro: `肾乃先天之本，经常熬夜、过度劳累、喝酒喝浓茶都会伤肾。面色暗、尿频、腰酸、性欲低、黎明时分腹泻，都是肾不好的表现。
07：00~11：00是一天里气温持续走高的一个过程，人和大自然是相互影响的，在这个时间段，太阳在逐渐高升，体内的肾气也蠢蠢欲动地受着外界的感召，如果此时能够用属于金性质的商音和属于水性质的羽音搭配比较融洽的曲子可促使肾的精气隆盛。
`
  },
  lung: {
    effect: '润肺',
    files: ['阳春白雪(琵琶).mp3'].map(fullPath),
    icon: <GiLungs />,
    max: 19,
    min: 15,
    intro: `吸烟、过度疲劳、呼吸道疾病、厨房油烟、汽车尾气、滥服药物、饮食不当都是引发肺部疾病、甚至是致癌的诱因。咽部溃疡疼痛、咳嗽、鼻塞、气喘、容易感冒、易出汗，都是肺不好的表现。
15：00~19：00太阳开始西下，归于西方金气最重的地方，体内的肺气在这个时段是比较旺盛的，随着曲子的旋律，一呼一吸之间，里应外合，事半功倍。
`
  },
  liver: {
    effect: '养肝',
    files: ['胡笳十八拍.mp3'].map(fullPath),
    icon: <GiLiver />,
    max: 23,
    min: 19,
    intro: `肝不好常常出现抑郁、易怒等情绪，而乳房胀痛、口苦、痛经、舌边部溃疡、眼部干涩、胆小、容易受惊吓则是外在表征。
19:00~23:00是一天中阴气最重的时间，一来可以克制旺盛的肝气，以免过多的肝气演变成火，另外可以利用这个时间旺盛的阴气来滋养肝，使之平衡正常。
`,
  },
  off: {
    effect: '休息一下',
    files: [],
    icon: <GiSoundOff />,
  },
}

export const ranges = {
  heart: [['12:30', '13:00'], ['22:00', '23:00']],
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
