/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class MediaUpload {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   path: string;

   @Column()
   galleryId: string;
 
   @Column()
   desc: string;
 
   @CreateDateColumn()
   createdAt: string;
 }