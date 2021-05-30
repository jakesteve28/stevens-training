/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Gallery } from './gallery.entity';
import { User } from './user.entity';
 
 @Entity()  
 export class MediaUpload {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   path: string;

   @ManyToOne(type => Gallery, gallery => gallery.uploads)
   gallery: Gallery;
 
   @Column()
   desc: string;
 
   @CreateDateColumn()
   createdAt: string;

   @ManyToOne(type => User, user => user.uploads)
   user: User;

 }