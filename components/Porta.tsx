import styles from '../styles/Porta.module.css'
import PortaModel from '../model/porta'
import Presente from '../components/Presente'

interface PortaProps {
    value: PortaModel
    onChage: (novaPorta: PortaModel) => void
}


export default function Porta(props: PortaProps) {
    const porta = props.value
    const selecionada = porta.selecionada && !porta.aberta ? styles.selecionada : ''
    
    const alternarSelecao = e => props.onChage(porta.alternarSelecao());
    const abrir = e => {
        e.stopPropagation()
        props.onChage(porta.abrir())
    }

    const renderizarPorta = () => (
        <div className={styles.porta}>
            <div className={styles.numero}>{porta.numero}</div>
            <div className={styles.macaneta} onClick={abrir}></div>
        </div>
    )
    
    return (
        <div className={styles.area} onClick={alternarSelecao}>
            <div className={`${styles.estrutura} ${selecionada}`}>
                {porta.fechada ? renderizarPorta() : porta.temPresente ? <Presente /> : false}
            </div>
            <div className={styles.chao}></div>
        </div>
    )
}