import React from 'react'
import style from './HomeSectionTitle.module.css'

interface IProps {
	title: string
	seemore?: string
}

function HomeSectionHead(props: IProps) {
	const { title, seemore } = props
	return (
		<div className={style.sectionHeadWrap}>
			<div className={style.home_title}>
				<span className={style.title}>{title}</span>
			</div>

			<div className={style.homeSeemore}>{'Xem thêm >>'}</div>
		</div>
	)
}

export default HomeSectionHead
