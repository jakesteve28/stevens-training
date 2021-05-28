/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class Exercise {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;
 
   @Column()
   img: string;

   @Column()
   galleryId: string;
 
   @CreateDateColumn()
   createdAt: string;
 }