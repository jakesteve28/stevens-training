/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class Place {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;
 
   @Column()
   galleryId: string;

   @Column()
   longitude: string; 

   @Column()
   latitude: string;
 
   @CreateDateColumn()
   createdAt: string;
 }