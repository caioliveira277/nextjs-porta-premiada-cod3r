import { useEffect, useState } from "react"
import Porta from "../../../components/Porta"
import { atualizarPortas, criarPortas } from "../../../functions/portas"
import styles from '../../../styles/jogo.module.css'
import Link from 'next/link'
import { useRouter } from "next/router"

export default function Jogo() {
    const router = useRouter()
    const [portas, setPortas] = useState([])
    const [valido, setValido] = useState(false)
    
    useEffect(() => {
        const portas = Number(router.query.portas)
        const temPresente = Number(router.query.temPresente)

        const qtdePortasValida = portas >= 3 && portas <= 100
        const temPresenteValido = temPresente >= 1 && temPresente <= portas

        setValido(qtdePortasValida && temPresenteValido)

        
    }, [router?.query])

    useEffect(() => {
        const portas = Number(router.query.portas)
        const temPresente = Number(router.query.temPresente)
        
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])

    const renderizarPortas = () => {
        return portas.map(porta => {
            return <Porta key={porta.numero} value={porta} onChage={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
        })
    }
    
    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {valido ? renderizarPortas() : <h1>Valores inválidos</h1>}
            </div>
            <div className={styles.botoes}>
                <Link href="/" passHref>
                    <button>Reiniciar jogo</button>
                </Link>
            </div>
        </div>
    )
}