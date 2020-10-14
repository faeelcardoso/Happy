import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    // RELACIONAMENTO
    // lincar as duas tabelas
    @ManyToOne(() => Orphanage, orphanage => orphanage.images) // muitos para um, muitas imagens para um orfanato
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}