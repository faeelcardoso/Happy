import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    // RELACIONAMENTO
    // aqui não irá ser uma coluna no banco de dados, só vou lincar as duas tabelas
    @OneToMany(() => Image, image => image.orphanage, { // um para muitos, um ofanato para muitas imagens
        cascade: ['insert', 'update'] 
        // se eu criar um orfanato e preencher ele com imgs, quando eu for alterar ou cadastrar,
        // vai cadastrar ou att as imagens relacionadas a este orfanato automáticamente
    }) 
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}