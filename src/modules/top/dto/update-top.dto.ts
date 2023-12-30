import { PartialType } from '@nestjs/mapped-types';
import { CreateTopDto } from './create-top.dto';

export class UpdateTopDto extends PartialType(CreateTopDto) {}
