import styles from './BaseTemplate.module.scss';

export interface IBaseTemplate {
  sampleTextProp:string;
}

export function BaseTemplate({ sampleTextProp: _unused }:IBaseTemplate) {
  return (
    <div className={styles.container}>BaseTemplate</div>
  );
}
export default BaseTemplate;
