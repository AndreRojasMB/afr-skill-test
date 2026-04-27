import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class QrService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(luminaireId: string) {
    const luminaire = await this.prisma.luminaire.findUnique({ where: { id: luminaireId } });
    if (!luminaire) throw new NotFoundException("Luminaria no encontrada.");

    const qrCode = luminaire.qrCode || `QR-${luminaire.municipalCode}`;
    return this.prisma.luminaire.update({
      where: { id: luminaireId },
      data: { qrCode },
      select: { id: true, municipalCode: true, qrCode: true, updatedAt: true },
    });
  }

  async get(luminaireId: string) {
    const luminaire = await this.prisma.luminaire.findUnique({
      where: { id: luminaireId },
      select: { id: true, municipalCode: true, qrCode: true },
    });
    if (!luminaire) throw new NotFoundException("Luminaria no encontrada.");
    return luminaire;
  }
}
