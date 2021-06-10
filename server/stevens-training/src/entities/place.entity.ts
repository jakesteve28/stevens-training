/**
 * 2021 Jacob Stevens
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { MediaUpload } from './media-upload.entity';
 
export enum PlaceType {
  gym = "Gym",
  studio = "Studio",
  outdoors = "Outdoors",
  home = "Home",
  other = "Other"
}

 @Entity()  
 export class Place {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;

   @Column({ default: "" })
   longitude: string; 

   @Column({ default: "" })
   latitude: string;

   @Column({ default: false })
   open: Boolean;
 
   @CreateDateColumn()
   createdAt: string;

   @Column({ type: "enum", enum: PlaceType })
   placeType: PlaceType;

   @Column()
   uploadedBy: string;

   @Column({ type: "simple-json" })
   uploads: Array<MediaUpload>;

 }