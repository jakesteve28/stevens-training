/**
 * 2021 Jacob Stevens
 */

 import { Entity, PrimaryGeneratedColumn } from 'typeorm';
 
 @Entity()  
 export class Gallery {
   @PrimaryGeneratedColumn("uuid")
   id: string
 }