﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Turistando.WebApi.Contexts;

namespace Turistando.WebApi.Migrations
{
    [DbContext(typeof(TuristandoContext))]
    partial class TuristandoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Turistando.WebApi.Models.Categoria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("Categoria");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.Reserva", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Avaliacao")
                        .HasColumnType("double(15,2)");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DataReserva")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Horario")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<int>("IdGuia")
                        .HasColumnType("int");

                    b.Property<int>("IdTurista")
                        .HasColumnType("int");

                    b.Property<string>("Local")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<double>("ValorTotal")
                        .HasColumnType("double(15,2)");

                    b.HasKey("Id");

                    b.HasIndex("IdGuia");

                    b.HasIndex("IdTurista");

                    b.ToTable("Reserva");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.ReservaRoteiro", b =>
                {
                    b.Property<int>("IdReserva")
                        .HasColumnType("int");

                    b.Property<int>("IdRoteiro")
                        .HasColumnType("int");

                    b.Property<double>("Avaliacao")
                        .HasColumnType("double(15,2)");

                    b.Property<string>("Informacoes")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<double>("Valor")
                        .HasColumnType("double(15,2)");

                    b.HasKey("IdReserva", "IdRoteiro");

                    b.HasIndex("IdRoteiro");

                    b.ToTable("ReservaRoteiro");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.Roteiro", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Cidade")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Descricao")
                        .HasColumnType("text");

                    b.Property<string>("Estado")
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<int>("IdGuia")
                        .HasColumnType("int");

                    b.Property<double>("Tempo")
                        .HasColumnType("double")
                        .HasMaxLength(250);

                    b.Property<double>("Valor")
                        .HasColumnType("double(15,2)");

                    b.HasKey("Id");

                    b.HasIndex("IdGuia");

                    b.ToTable("Roteiro");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.RoteiroCategoria", b =>
                {
                    b.Property<int>("IdRoteiro")
                        .HasColumnType("int");

                    b.Property<int>("IdCategoria")
                        .HasColumnType("int");

                    b.HasKey("IdRoteiro", "IdCategoria");

                    b.HasIndex("IdCategoria");

                    b.ToTable("RoteiroCategoria");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Cidade")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Estado")
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<double>("GuiaAvaliacao")
                        .HasColumnType("double(15,2)");

                    b.Property<string>("GuiaCarro")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("GuiaDetalhe")
                        .HasColumnType("text");

                    b.Property<string>("GuiaHorario")
                        .HasColumnType("text");

                    b.Property<string>("GuiaPlaca")
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("varchar(250) CHARACTER SET utf8mb4")
                        .HasMaxLength(250);

                    b.Property<string>("Sexo")
                        .IsRequired()
                        .HasColumnType("varchar(2) CHARACTER SET utf8mb4")
                        .HasMaxLength(2);

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("varchar(50) CHARACTER SET utf8mb4")
                        .HasMaxLength(50);

                    b.Property<int>("Tipo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Turistando.WebApi.Models.Reserva", b =>
                {
                    b.HasOne("Turistando.WebApi.Models.Usuario", "Guia")
                        .WithMany("ReservasGuia")
                        .HasForeignKey("IdGuia")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Turistando.WebApi.Models.Usuario", "Turista")
                        .WithMany("ReservasTurista")
                        .HasForeignKey("IdTurista")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Turistando.WebApi.Models.ReservaRoteiro", b =>
                {
                    b.HasOne("Turistando.WebApi.Models.Reserva", "Reserva")
                        .WithMany("ReservaRoteiros")
                        .HasForeignKey("IdReserva")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Turistando.WebApi.Models.Roteiro", "Roteiro")
                        .WithMany("ReservaRoteiros")
                        .HasForeignKey("IdRoteiro")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Turistando.WebApi.Models.Roteiro", b =>
                {
                    b.HasOne("Turistando.WebApi.Models.Usuario", "Guia")
                        .WithMany("Roteiros")
                        .HasForeignKey("IdGuia")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Turistando.WebApi.Models.RoteiroCategoria", b =>
                {
                    b.HasOne("Turistando.WebApi.Models.Categoria", "Categoria")
                        .WithMany("RoteiroCategorias")
                        .HasForeignKey("IdCategoria")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Turistando.WebApi.Models.Roteiro", "Roteiro")
                        .WithMany("RoteiroCategorias")
                        .HasForeignKey("IdRoteiro")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
