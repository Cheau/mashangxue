import React from 'react'
import { FcHome } from 'react-icons/fc'

import DailyConversation from '../../Frame/studio-classroom/daily-conversation'

export default {
  icon: <FcHome />,
  title: '空中英语教室-日常对话',
  link: (order) => `/docs/studio-classroom/daily-conversation/${order.toString().padStart(3, '0')}`,
  Player: DailyConversation,
  data: [
    {
      desc: 'appointment, restroom, elevator',
      donut: '【约定】会面的人还有十分钟才来，做点什么好呢？不妨上个【洗手间】压压惊。',
      title: '和办公室柜台谈话',
    },
    {
      desc: 'baggage carousel, hard-shell suitcase, luggage claim form, inconvenience',
      donut: '降落后在【行李传送带】上找不到自己的【旅行箱】？快去行李服务处【填认领表】！',
      rate: 2,
      title: '行李遗失',
    },
    {
      desc: 'inspection, dent, covered, collision damage waiver',
      donut: '租的车被【检出凹痕】怎么办？别慌，先看下是否被【车辆碰撞险】所【涵盖】。',
      rate: 3,
      title: '归还租车',
    },
    {
      date: '2023/11/30',
      desc: 'half size, tight, pinch, comfortable, loose, heel, ring up',
      donut: '鞋子买多大穿起来才【舒服】呢？那就是脚后跟【正好放下一根手指】，不然就会【太紧】或【太松】。',
      rate: 2,
      title: '购买鞋子',
    },
    {
      desc: 'ticket, zone',
      donut: '一日之内多次乘地铁怎样买票能【花费】更少？没错，就是买【一日票】。',
      title: '购买地铁票',
    },
    {
      date: '2023/11/15',
      desc: 'cold, cough, flu, symptom, body aches, fever',
      rate: 2,
      title: '感冒和流感',
    },
    {
      desc: 'dress code, semi-formal, tuxedo, overdressing, business casual, cocktail dress',
      rate: 3,
      title: '服装规定',
    },
    {
      desc: 'telecom store, skybridge, escalators, supermarket',
      rate: 3,
      title: '服务台',
    },
    {
      desc: 'sweater, in stock, location',
      title: '服饰店',
    },
    {
      desc: 'mandatory basic training, shortened, exchange program, job search',
      rate: 2,
      title: '服兵役',
    },
    {
      desc: 'shuttle service, regular schedule, book in advance, pickup location',
      rate: 3,
      title: '饭店接驳服务',
    },
    {
      bg: 'cornsilk',
      desc: 'out of the office, message, call someone back',
      title: '电话留言',
      x: '-45%',
    },
    {
      desc: 'diet coke, smoothies, mango, passion fruit, strawberry, appetizers',
      rate: 2,
      title: '点饮料',
    },
    {
      desc: 'latte, short, tall, grande, chocolate muffin',
      date: '2023/11/6',
      title: '点咖啡',
    },
    {
      desc: 'scoop, cone, wafer, waffle, flavor, sorbet',
      rate: 2,
      title: '点冰淇淋',
    },
    {
      desc: 'earthquake, scale, epicenter, collapse, aftershock',
      date: '2023/11/1',
      rate: 3,
      title: '地震',
    },
    {
      desc: 'hiking, club, skill, level, overseas, upcoming',
      date: '2023/10/31',
      rate: 3,
      title: '登山踏青',
    },
    {
      desc: 'check in, baggage, scale, boarding pass, security check',
      date: '2023/10/29',
      rate: 2,
      title: '登机报到',
      x: '-30%',
    },
    {
      desc: 'backpack, stolen, riding, get on, forms',
      title: '到警局备案',
      x: '-45%',
    },
    {
      bg: 'lightblue',
      desc: 'sophomore, freshman, major, minor, workload, graduate',
      rate: 3,
      title: '大学主修',
    },
    {
      desc: 'sick leave, nasty, take care of, pitch',
      rate: 3,
      title: '打电话请病假',
    },
    {
      desc: 'book, reservation, hold',
      title: '打电话订餐厅',
    },
    {
      desc: 'to go, separate, packed',
      title: '打包剩余食物',
    },
    {
      desc: 'flight, process, nightmare, grounded, connection, delay',
      rate: 3,
      title: '错过班机',
    },
    {
      desc: 'rescued, shelter, breed, landlord, lease, dog-sit',
      rate: 3,
      title: '宠物',
    },
    {
      desc: 'excuse, bakery, cashiers, aisle',
      title: '超市询问方向',
    },
    {
      desc: 'get off, shift, cloth, pad, receipt',
      title: '超市结账',
    },
    {
      desc: 'order, restaurant, delivery, venture, lousy, convenient',
      rate: 2,
      title: '餐饮外送App',
    },
    {
      desc: 'soaked, change, rainstorm, lifesaver, weather forecast',
      rate: 3,
      title: '暴风雨',
      x: '20%',
      y: '-15%',
    },
    {
      desc: 'sign up, gym, membership, monthly, initiation, fill out',
      rate: 2,
      title: '报名健身',
    },
    {
      desc: 'calendar, check, business trip',
      title: '安排会议',
    },
    {
      desc: 'videos, comedies, tutorials, make-up, channels',
      title: 'YouTube',
    },
    {
      desc: 'Band-Aid, acne, patch, pimple, over-the-counter, dermatologist, prescription, laser, scars, complain',
      date: '2023/7/17',
      rate: 3,
      title: '痘痘护理',
      x: '50%',
    }
  ]
}
