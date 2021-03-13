using NHibernate;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate.Tool.hbm2ddl;



namespace Hackabull2021Backend.Models
{
	public class OpenNHibernateSession
	{
		private static ISessionFactory _sessionFactory;

		private static ISessionFactory SessionFactory
		{
			get
			{
				if (_sessionFactory == null)
					InitializeSessionFactory();
				return _sessionFactory;
			}
		}

		private static void InitializeSessionFactory()
		{
			_sessionFactory = Fluently.Configure()

			.Database(MsSqlConfiguration.MsSql2012
				.ConnectionString(
					   @"Host=localhost; Port=5434; Database=hackabull2021; Username=hcaker; Password=psswrd;"
				).ShowSql()
			)
			.Mappings(m => m.FluentMappings
			   .AddFromAssemblyOf<Test>()
			)
			.ExposeConfiguration(cfg => new SchemaExport(cfg)
				.Create(true, true)
			)
			.BuildSessionFactory();
		}

		public static ISession OpenSession()
		{
			return SessionFactory.OpenSession();
		}
	}
}