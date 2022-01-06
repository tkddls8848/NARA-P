import Link from "next/link"

const header = () => (
    <div style={{
        marginBottom: 20,
        padding: "20px 0",
        borderBottom: "0.5px solid",
        textAlign: "center",
    }}>
        This is Header
        <button><Link href='http://localhost:3000/'>Home</Link></button>
        <button><Link href='http://localhost:3000/task/sajeon'>sajeon</Link></button>
        <button><Link href='http://localhost:3000/task/bone'>bone</Link></button>
    </div>
)

export default header