import { Card } from "@nextui-org/react";

const Tentang = () => {
    return (
        <Card className="flex flex-col gap-2 p-6" style={{ border: "1px solid #F7F7F7", borderRadius: "15px", marginTop: "10px" }}>
            <p className="flex justify-center items-center text-2xl font-bold font-inter mb-2 text-bluePrimary">Tentang</p>
            <div className="flex flex-col gap-2 text-[16px] font-openSans text-justify">
                <p >Kejelasan dan kemudahan untuk mendapatkan data menjadi salah satu perhatian BPS dalam rangka penyebarluasan data dan informasi statistik. Pelayanan Statistik Terpadu (PST) telah menjadi salah satu bisnis proses BPS selama ini. Akan tetapi, seiring berkembangan teknologi digital BPS percaya bahwa pelayanan tidak sebatas secara tatap muka tetapi dapat dikembangkan dengan pelayanan online.</p>
                <p >Portal ini adalah suatu sistem yang dibangun untuk meningkatkan pemenuhan kebutuhan pengguna data dengan memberikan pelayanan yang lebih cepat, lebih baik, lebih mudah diakses dan lebih berkualitas.</p>
                <p >Kami hadir dengan penampilan baru yang lebih nyaman. Bayangkan mendapatkan data dan informasi statistik tanpa meninggalkan rumah. Kami hadir untuk memenuhi kebutuhan Anda dan kami siap melayani dengan hati.</p>
            </div>

        </Card>
    )
}

export default Tentang;