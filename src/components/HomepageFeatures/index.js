import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '从零开始帮入门',
    Svg: require('@site/static/img/start.svg').default,
    description: (
      <>
        英语，也许你从未接触过，又或者你学过但不得其门而入。<br/>
        <strong>正所谓温故而知新，让我们一起从零开始学英语，从Newbie迈向牛B。</strong>
      </>
    ),
  },
  {
    title: '英语思维助练成',
    Svg: require('@site/static/img/atomic.svg').default,
    description: (
      <>
        你认真学英语，却难以像母语般地道流畅地沟通，很可能是"哑巴英语"让你陷入了"听说"能力陷阱。<br/>
        <strong>让我们打破"英中思中英"这种转换模式里中文构筑起的包围圈，练成"英思英"的顺畅模式。</strong>
      </>
    ),
  },
  {
    title: '听说读写皆可能',
    Svg: require('@site/static/img/goal.svg').default,
    description: (
      <>
        语言是用来交流的，口头交流需要掌握听说能力，书面交流需要掌握读写能力。<br/>
        <strong>我会记下英语学习过程中积累的知识、方法和经验，帮你复制我的进步，掌握这些能力。</strong>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
