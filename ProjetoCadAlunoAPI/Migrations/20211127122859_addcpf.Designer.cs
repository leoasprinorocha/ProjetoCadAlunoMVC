﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjetoCadAlunoAPI.DATA.Context;

namespace ProjetoCadAlunoAPI.Migrations
{
    [DbContext(typeof(ProjetoCadAlunoContext))]
    [Migration("20211127122859_addcpf")]
    partial class addcpf
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.12");

            modelBuilder.Entity("ProjetoCadAluno.DOMAIN.Models.Aluno", b =>
                {
                    b.Property<int>("Matricula")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CpfAluno")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DataRegistroAluno")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DataUltimaAtualizacao")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nome")
                        .HasColumnType("longtext");

                    b.Property<int>("Situacao")
                        .HasColumnType("int");

                    b.Property<string>("Telefone")
                        .HasColumnType("longtext");

                    b.HasKey("Matricula");

                    b.ToTable("Aluno");
                });
#pragma warning restore 612, 618
        }
    }
}
