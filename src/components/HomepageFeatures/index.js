import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Image from '../Image'

const FeatureList = [
  {
    title: '查单词，更便捷',
    image: <Image src="feat/dict.svg" />,
    description: (
      <>
        页面内的任意单词，只要选中即可查询释义<br/>
        <strong>用鼠标左键双击<br/>或在手机、平板电脑上手指轻轻一按</strong>
      </>
    ),
  },
  {
    title: '学英语，尽掌握',
    image: <Image src="feat/handy.svg" />,
    description: (
      <>
        页面内容对手机和平板电脑进行了适配<br/>
        <strong>让你随时随地，想学就学</strong>
      </>
    ),
  },
  {
    title: '用技术，促进步',
    image: <Image src="feat/tech.svg" />,
    description: (
      <>
        作为一个技术人，始终相信技术可以帮助学习进步，更多功能持续开发中...<br/>
        <strong>工欲善其事，必先利其器</strong>
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {image}
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
