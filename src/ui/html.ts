/*
 * 可以使用html语法来设置文字
 */

// ============================== 导入
import { Widget } from '../widget/widget';

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class InnerHTML extends Widget {

	public firstPaint() {
		(<HTMLElement>this.tree.link).innerText = this.props;
	}
	public afterUpdate() {
		(<HTMLElement>this.tree.link).innerText = this.props;
	}
}

// ============================== 本地

// ============================== 立即执行
